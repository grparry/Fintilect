using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Microsoft.Extensions.Logging;
using Requests.Payee;
using Responses.Payee;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Enums;
using Requests.Payment;
using ConnectBillPay.Core.Providers.Abstract;

namespace Services.Implementation
{
    public class PayeeService : IPayeeService
    {
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly IWarehouseGenericRepository<GlobalPayeeChangeHistory> _globalPayeeChangeHistoryRepository;
        private readonly ICuGenericRepository<UserPayeeListChangeHistory> _userPayeeListHistoryRepository;
        private readonly IWarehouseGenericRepository<PaymentException> _paymentExceptionRepository;
        private readonly IWarehouseGenericRepository<FisExceptionsCorrection> _fisExceptionsCorrectionRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<PayeeService> _logger;
        private readonly IPaymentService _paymentService;
        private readonly IExceptionService _exceptionService;
        private readonly INotificationProvider _notificationProvider;

        public PayeeService(IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository,
            ICuGenericRepository<UserPayeeListChangeHistory> userPayeeListHistoryRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IWarehouseGenericRepository<GlobalPayeeChangeHistory> globalPayeeChangeHistoryRepository, 
            ILogger<PayeeService> logger, 
            IPaymentService paymentService, 
            INotificationProvider notificationProvider, 
            IExceptionService exceptionService, 
            IWarehouseGenericRepository<PaymentException> paymentExceptionRepository, 
            IWarehouseGenericRepository<FisExceptionsCorrection> fisExceptionsCorrectionRepository)
        {
            _globalPayeeRepository = globalPayeeRepository;
            _userPayeeListHistoryRepository = userPayeeListHistoryRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _globalPayeeChangeHistoryRepository = globalPayeeChangeHistoryRepository;
            _logger = logger;
            _paymentService = paymentService;
            _notificationProvider = notificationProvider;
            _exceptionService = exceptionService;
            _paymentExceptionRepository = paymentExceptionRepository;
            _fisExceptionsCorrectionRepository = fisExceptionsCorrectionRepository;
        }

        public async Task<ServiceResponse> CloseGlobalPayeeAsync(PayeeCloseGlobalRequest request)
        {
            var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == request.FisPayeeId);
            if (globalPayee == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            var userPayeeListRepo = _unitOfWork.Repo<UserPayeeList>();
            var userPayeeListHistoryRepo = _unitOfWork.Repo<UserPayeeListChangeHistory>();
            var personalPayeeRepo = _unitOfWork.Repo<PersonalPayee>();
            var userPayeeLists = await userPayeeListRepo.FindAsync(x => x.FisPayeeId == request.FisPayeeId);

            foreach (var userPayeeList in userPayeeLists)
            {
                var beforeChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
                beforeChangeHistory.ModifyType = "1";
                beforeChangeHistory.ModifyDate = DateTime.Now;
                beforeChangeHistory.ModifiedBy = "fis closed payees";
                beforeChangeHistory.Reason = "updated - before";
                userPayeeListHistoryRepo.Add(beforeChangeHistory);

                if (userPayeeList.PayeeId == request.FisPayeeId)
                {
                    // insert personal payee
                    var personalPayeeId = await personalPayeeRepo.GeneratePersonalPayeeIdAsync();
                    var personalPayee = new PersonalPayee
                    {
                        AddressLine1 = globalPayee.AddressLine1,
                        AddressLine2 = globalPayee.AddressLine2,
                        City = globalPayee.City,
                        CountryCode = globalPayee.CountryCode,
                        LastUpdated = DateTime.Now,
                        LastUpdatedBy = "global payee closed",
                        PayeeId = personalPayeeId,
                        PayeeName = globalPayee.PayeeName,
                        PhoneNumber = globalPayee.PhoneNumber,
                        State = globalPayee.State,
                        ZipCode = globalPayee.ZipCode,
                        CheckLeadTime = globalPayee.CheckLeadTime
                    };
                    personalPayeeRepo.Add(personalPayee);
                    userPayeeList.PayeeId = personalPayeeId;
                }

                userPayeeList.PayeeType = PayeeType.Personal;
                userPayeeList.PaymentMethod = PaymentMethods.Check;
                userPayeeList.FisPayeeId = null;
                userPayeeListRepo.Update(userPayeeList);

                var afterChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
                afterChangeHistory.ModifyType = "1";
                afterChangeHistory.ModifyDate = DateTime.Now;
                afterChangeHistory.ModifiedBy = "fis closed payees";
                afterChangeHistory.Reason = "updated - after";
                userPayeeListHistoryRepo.Add(afterChangeHistory);
            }

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> CopyMemberPayeesAsync(CopyMemberPayeesRequest request)
        {
            var userPayeeListRepo = _unitOfWork.Repo<UserPayeeList>();
            var userPayeeListChangeHistoryRepo = _unitOfWork.Repo<UserPayeeListChangeHistory>();
            var personalPayeeRepo = _unitOfWork.Repo<PersonalPayee>();
            var paymentRepo = _unitOfWork.Repo<Payment>();
            var paymentChangeHistoryRepo = _unitOfWork.Repo<PaymentChangeHistory>();
            var paymentHistoryRepo = _unitOfWork.Repo<PaymentHistory>();

            var sourceMemberPayees = await userPayeeListRepo.GetUserPayees(request.MemberId);
            if (sourceMemberPayees.Count == 0)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            var existingTargetPayees = await userPayeeListRepo.GetUserPayees(request.NewMemberId);

            // run duplicate check
            var uniquePayeeListIds = sourceMemberPayees.Where(x => !existingTargetPayees.Any(y => IsUserPayeeDuplicate(x, y)))
                .Select(x => x.UserPayeeListId)
                .ToList();

            var payeesToCopy = await userPayeeListRepo.FindAsync(x => uniquePayeeListIds.Contains(x.Id));

            foreach (var payee in payeesToCopy)
            {
                PersonalPayee existingPersonal = null;
                if (payee.PayeeType == PayeeType.Personal || payee.PayeeId != payee.FisPayeeId)
                {
                    existingPersonal = await personalPayeeRepo.GetAsync(x => x.PayeeId == payee.PayeeId);
                    if (existingPersonal == null)
                    {
                        _logger.LogInformation($"Personal Payee {payee.PayeeId} does not exist in PersonalPayee table for UserListId: {payee.Id}");
                        continue;
                    }
                }

                // copy to new userPayeeList item
                var userPayeeListId = await userPayeeListRepo.GenerateUserPayeeListIdAsync();

                var newUserPayeeList = new UserPayeeList
                {
                    Id = userPayeeListId,
                    LastUpdatedBy = "admin",
                    NameOnAccount = payee.NameOnAccount,
                    NickName = payee.NickName,
                    MemberId = request.NewMemberId,
                    PayeeId = payee.PayeeId,
                    PayeeType = payee.PayeeType,
                    PaymentMethod = payee.PaymentMethod,
                    UsersAccountAtPayee = payee.UsersAccountAtPayee,
                    Favorite = payee.Favorite,
                    FisPayeeId = payee.FisPayeeId,
                    AttentionLine = payee.AttentionLine,
                    Active = payee.Active,
                    Updated = true,
                    Created = DateTime.Now,
                    LastUpdated = DateTime.Now
                };

                if (existingPersonal != null)
                {
                    // copy personal payee
                    var personalPayeeId = await personalPayeeRepo.GeneratePersonalPayeeIdAsync();
                    var personalPayee = _mapper.Map<PersonalPayee>(existingPersonal);

                    personalPayee.Created = DateTime.Now;
                    personalPayee.LastUpdated = DateTime.Now;
                    personalPayee.LastUpdatedBy = "admin";
                    personalPayee.PayeeId = personalPayeeId;
                    personalPayee.Id = 0; // prevent identity insert error

                    personalPayeeRepo.Add(personalPayee);

                    newUserPayeeList.PayeeId = personalPayeeId;
                }

                userPayeeListRepo.Add(newUserPayeeList);

                var newChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(newUserPayeeList);
                newChangeHistory.ModifiedBy = "admin";
                newChangeHistory.ModifyDate = DateTime.Now;
                newChangeHistory.ModifyType = "1";
                newChangeHistory.Reason = $"Created as a result of payees from member {request.MemberId} being copied to {request.NewMemberId}";
                userPayeeListChangeHistoryRepo.Add(newChangeHistory);
            }

            foreach (var payee in payeesToCopy)
            {
                var beforeChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(payee);
                beforeChangeHistory.ModifiedBy = "admin";
                beforeChangeHistory.ModifyDate = DateTime.Now;
                beforeChangeHistory.ModifyType = "1";
                beforeChangeHistory.Reason = "update - before";
                userPayeeListChangeHistoryRepo.Add(beforeChangeHistory);

                // Mark original inactive.
                payee.Active = false;
                payee.LastUpdated = DateTime.Now;
                payee.LastUpdatedBy = "admin";
                userPayeeListRepo.Update(payee);

                var afterChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(payee);
                afterChangeHistory.ModifiedBy = "admin";
                afterChangeHistory.ModifyDate = DateTime.Now;
                afterChangeHistory.ModifyType = "1";
                afterChangeHistory.Reason = "update - after";
                userPayeeListChangeHistoryRepo.Add(afterChangeHistory);
            }

            var payments = await paymentRepo.FindAsync(x => x.MemberId == request.MemberId && x.StatusCode == 100);
            foreach (var payment in payments)
            {
                var beforeChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
                beforeChangeHistory.ModifiedBy = "admin";
                beforeChangeHistory.ModifyDate = DateTime.Now;
                beforeChangeHistory.ModifyType = "1";
                beforeChangeHistory.Reason = "before - status update";
                paymentChangeHistoryRepo.Add(beforeChangeHistory);

                // Mark the Payment Cancelled.
                payment.StatusCode = 103;
                payment.LastUpdate = DateTime.Now;
                paymentRepo.Update(payment);

                var paymentHistory = await paymentHistoryRepo.GetAsync(x => x.PaymentId == payment.Id);
                if (paymentHistory != null)
                {
                    paymentHistory.StatusCode = 103;
                    paymentHistory.LastUpdate = DateTime.Now;
                    paymentHistoryRepo.Update(paymentHistory);
                }

                var afterChangeHistory = _mapper.Map<PaymentChangeHistory>(payment);
                afterChangeHistory.ModifiedBy = "admin";
                afterChangeHistory.ModifyDate = DateTime.Now;
                afterChangeHistory.ModifyType = "1";
                afterChangeHistory.Reason = "after - status update";
                paymentChangeHistoryRepo.Add(afterChangeHistory);
            }

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        private async Task<string> GetGlobalPayeePaymentMethod(string payeeId)
        {
            var paymentMethod = "C";
            var globalPayees = await _globalPayeeRepository.FindAsync(x => x.InternalPayeeId == payeeId);
            if (globalPayees != null && globalPayees.Any())
            {
                var globalPayee = globalPayees.FirstOrDefault(x => x.DisbursementType != null);
                if (globalPayee != null && globalPayee.DisbursementType.ToUpper() == "ELECTRONIC")
                {
                    paymentMethod = "E";
                }
            }

            return paymentMethod;
        }

        public async Task<ServiceResponse<GlobalPayeeChangeHistoryListResponse>> GlobalPayeeChangeHistoryAsync(GlobalPayeeChangeHistoryReportRequest request)
        {
            var changeHistories = new List<GlobalPayeeChangeHistory>();
            IEnumerable<GlobalPayeeChangeHistory> histories;
            switch (request.SearchType)
            {
                case SearchType.Date:
                    // Date Range
                    if (request.StartDate.HasValue)
                    {
                        if (request.EndDate.HasValue)
                        {
                            histories = await _globalPayeeChangeHistoryRepository.FindAsync(x => x.InsertDate.Date >= request.StartDate.Value.Date &&
                                x.InsertDate.Date <= request.EndDate.Value.Date);
                        }
                        else
                        {
                            histories = await _globalPayeeChangeHistoryRepository.FindAsync(x => x.InsertDate.Date == request.StartDate.Value.Date);
                        }
                        changeHistories.AddRange(histories);
                    }
                    break;
                case SearchType.FisPayeeId:
                    histories = await _globalPayeeChangeHistoryRepository.FindAsync(x => x.InternalPayeeId == request.SearchValue);
                    changeHistories.AddRange(histories);
                    break;
                case SearchType.PayeeName:
                    histories = await _globalPayeeChangeHistoryRepository.FindAsync(x => x.PayeeName.ToUpper().Contains(request.SearchValue.Trim().ToUpper()));
                    changeHistories.AddRange(histories);
                    break;
                default:
                    var payments =
                        await _userPayeeListHistoryRepository.GlobalPayeeListChangeHistoriesAsync(request.SearchType,
                            request.SearchValue);
                    foreach (var payment in payments)
                    {
                        histories =
                            await _globalPayeeChangeHistoryRepository.FindAsync(x =>
                                x.InternalPayeeId == payment.FisPayeeId);
                        if (histories.Any())
                        {
                            changeHistories.AddRange(histories);
                        }
                    }
                    break;
            }

            var globalList = new List<GlobalPayeeChangeHistoryResponse>();
            var memberPayees = await _userPayeeListHistoryRepository.GetMemberGlobalPayeeChangeInformation(changeHistories);

            foreach (var memberPayee in memberPayees)
            {
                var globalPayee = changeHistories.FirstOrDefault(x => x.InternalPayeeId.Trim() == memberPayee.FisPayeeId.Trim());
                globalList.Add(new GlobalPayeeChangeHistoryResponse
                {
                    Id = globalPayee.Id,
                    RecordType = globalPayee.RecordType,
                    InternalPayeeId = globalPayee.InternalPayeeId,
                    PayeeName = globalPayee.PayeeName,
                    AttentionLine = globalPayee.AttentionLine,
                    AddressLine1 = globalPayee.AddressLine1,
                    AddressLine2 = globalPayee.AddressLine2,
                    City = globalPayee.City,
                    State = globalPayee.State,
                    ZipCode = globalPayee.ZipCode,
                    CountryCode = globalPayee.CountryCode,
                    PhoneNumber = globalPayee.PhoneNumber,
                    PayeeStatus = globalPayee.PayeeStatus,
                    DisbursementType = globalPayee.DisbursementType,
                    PayeeLevelType = globalPayee.PayeeLevelType,
                    CustomerId = globalPayee.CustomerId,
                    ElectronicLeadTime = globalPayee.ElectronicLeadTime,
                    CheckLeadTime = globalPayee.CheckLeadTime,
                    Ofacstatus = globalPayee.Ofacstatus,
                    CloseReason = globalPayee.CloseReason,
                    FileCreatorCutoffTime = globalPayee.FileCreatorCutoffTime,
                    IndustryCode = globalPayee.IndustryCode,
                    Reason = globalPayee.Reason,
                    InsertDate = globalPayee.InsertDate,
                    MemberFirstName = memberPayee.MemberFirstName,
                    MemberMiddleName = memberPayee.MemberMiddleName,
                    MemberLastName = memberPayee.MemberLastName,
                    UserPayeeListId = memberPayee.UserPayeeListId,
                    MemberId = memberPayee.MemberId
                });
            }

            return new ServiceResponse<GlobalPayeeChangeHistoryListResponse>
            {
                Error = "",
                StatusCode = 200,
                Object = new GlobalPayeeChangeHistoryListResponse
                {
                    Histories = globalList
                }
            };
        }

        public async Task<ServiceResponse<UserPayeeChangeHistoryListResponse>> UserPayeeChangeHistoryAsync(UserPayeeChangeHistoryReportRequest request)
        {
            var changeHistories = await _userPayeeListHistoryRepository.GetUserPayeeListChangeHistoriesAsync(request.StartDate, request.EndDate, request.SearchType, request.SearchValue);
            var payeeNames = new Dictionary<string, string>();
            var responses = new List<UserPayeeChangeHistoryResponse>();

            foreach (var history in changeHistories)
            {
                var response = _mapper.Map<UserPayeeChangeHistoryResponse>(history);
                switch (response.PaymentMethod)
                {
                    case PaymentMethods.Check:
                        response.PaymentMethod = "Check";
                        break;
                    case PaymentMethods.Electronic:
                        response.PaymentMethod = "Electronic";
                        break;
                }

                var name = response.PayeeName;
                if (string.IsNullOrEmpty(response.PayeeName) &&
                    !payeeNames.TryGetValue(response.PayeeId, out name))
                {
                    switch (response.PayeeType)
                    {
                        case PayeeType.Global:
                        case PayeeType.OnUs:
                        case PayeeType.OffHost:
                            var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == response.PayeeId);
                            if (globalPayee != null)
                            {
                                name = globalPayee.PayeeName;
                                payeeNames.Add(response.PayeeId, name);
                            }
                            break;
                    }
                }

                response.PayeeName = name;
                responses.Add(response);
            }

            return new ServiceResponse<UserPayeeChangeHistoryListResponse>
            {
                StatusCode = 200,
                Object = new UserPayeeChangeHistoryListResponse
                {
                    Histories = responses
                }
            };
        }

        public async Task<ServiceResponse> UpdateAccountNumberAndReprocessAsync(UpdateAccountAndReprocessRequest request)
        {
            if (string.IsNullOrEmpty(request.UserPayeeListId) || string.IsNullOrEmpty(request.AccountNumber) || string.IsNullOrEmpty(request.PaymentId))
            {
                return new ServiceResponse
                {
                    StatusCode = 401,
                    Error = "The request was not formatted correctly"
                };
            }

            var updateAccountRequest = new UserPayeeUpdateAccountNumberRequest
            {
                UserPayeeListId = request.UserPayeeListId,
                AccountNumber = request.AccountNumber
            };

            var updateAccountResponse = await UpdateUserPayeeAccountNumberAsync(updateAccountRequest);
            if (updateAccountResponse.StatusCode != 200)
            {
                return updateAccountResponse;
            }

            var reprocessRequest = new PaymentReprocessRequest
            {
                PaymentId = request.PaymentId
            };

            var reprocessResponse = await _paymentService.ReprocessAsync(reprocessRequest);
            if (reprocessResponse.StatusCode != 200)
            {
                return reprocessResponse;
            }

            await _notificationProvider.SendNotification(105, string.Empty);
            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> UpdateAccountNumberAndRefund(UpdateAccountAndRefund request)
        {
            if (string.IsNullOrEmpty(request.UserPayeeListId) || 
                string.IsNullOrEmpty(request.AccountNumber) || 
                string.IsNullOrEmpty(request.PaymentId) || 
                request.ExceptionId == 0)
            {
                return new ServiceResponse
                {
                    StatusCode = 401,
                    Error = "The request was not formatted correctly"
                };
            }

            var updateAccountRequest = new UserPayeeUpdateAccountNumberRequest
            {
                UserPayeeListId = request.UserPayeeListId,
                AccountNumber = request.AccountNumber
            };

            var updateAccountResponse = await UpdateUserPayeeAccountNumberAsync(updateAccountRequest);
            if (updateAccountResponse.StatusCode != 200)
            {
                return updateAccountResponse;
            }

            var reprocessResponse = await _exceptionService.CheckForRefundAdjustmentAsync(request.PaymentId, request.ExceptionId);
            if (reprocessResponse.StatusCode != 200)
            {
                return reprocessResponse;
            }

            await _notificationProvider.SendNotification(8004, string.Empty);
            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> UpdateFisPayeeIdAndRefundAsync(UpdateFisPayeeIdAndRefundRequest request)
        {
            var updateFisPayeeIdRequest = new UserPayeeUpdateFisPayeeIdRequest
            {
                UserPayeeListId = request.UserPayeeListId,
                FisPayeeId = request.FisPayeeId
            };

            var updateFisPayeeIdResponse = await UpdateUserPayeeFisPayeeIdAsync(updateFisPayeeIdRequest);
            if (updateFisPayeeIdResponse.StatusCode != 200)
            {
                return updateFisPayeeIdResponse;
            }

            var reprocessResponse = await _exceptionService.CheckForRefundAdjustmentAsync(request.PaymentId, request.ExceptionId);
            if (reprocessResponse.StatusCode != 200)
            {
                return reprocessResponse;
            }

            await _notificationProvider.SendNotification(8004, string.Empty);
            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> UpdateUserPayeeAccountNumberAsync(UserPayeeUpdateAccountNumberRequest request)
        {
            var userPayeeListRepo = _unitOfWork.Repo<UserPayeeList>();
            var userPayeeListChangeHistoryRepo = _unitOfWork.Repo<UserPayeeListChangeHistory>();

            var userPayeeList = await userPayeeListRepo.GetAsync(x => x.Id == request.UserPayeeListId);

            if (userPayeeList == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404,
                    Error = "A User Payee with the given UserPayeeListId was not found"
                };
            }

            var beforeChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
            beforeChangeHistory.ModifiedBy = "admin";
            beforeChangeHistory.ModifyDate = DateTime.Now;
            beforeChangeHistory.ModifyType = "1";
            beforeChangeHistory.Reason = "update - before";
            userPayeeListChangeHistoryRepo.Add(beforeChangeHistory);

            userPayeeList.UsersAccountAtPayee = request.AccountNumber;
            userPayeeList.Updated = true;
            userPayeeList.LastUpdated = DateTime.Now;
            userPayeeList.LastUpdatedBy = "admin";
            userPayeeListRepo.Update(userPayeeList);

            var afterChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
            afterChangeHistory.ModifiedBy = "admin";
            afterChangeHistory.ModifyDate = DateTime.Now;
            afterChangeHistory.ModifyType = "1";
            afterChangeHistory.Reason = "update - after";
            userPayeeListChangeHistoryRepo.Add(afterChangeHistory);

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> UpdateManualAndReprocessAsync(ManualUpdateRequest request)
        {
            var exception = await _paymentExceptionRepository.GetAsync(x => x.Id == request.FisExceptionId);
            var correction = await _fisExceptionsCorrectionRepository.GetAsync(x => x.FisExceptionId == request.FisExceptionId);
            if (correction.Reprocessed)
            {
                return new ServiceResponse
                {
                    Error = $"Exception with FisExceptionId: {request.FisExceptionId} has already been reprocessed",
                    StatusCode = 400
                };
            }

            var reprocessRequest = new PaymentReprocessRequest
            {
                PaymentId = exception.SponsorTransactionId
            };

            // reprocess payment
            var reprocessResponse = await _paymentService.ReprocessAsync(reprocessRequest);
            if (reprocessResponse.StatusCode != 200)
            {
                _logger.LogError($"Failed to mark payment to be reprocessed with status code: {reprocessResponse.StatusCode}");
                return reprocessResponse;
            }
            
            correction.CorrectionMade = true;
            correction.CorrectionType = (int)ExceptionCorrectionType.Manual;
            correction.CorrectionDate = DateTime.Now;
            correction.Reprocessed = true;
            correction.ReprocessedDate = DateTime.Now;
            correction.ManualDescription = request.ManualDescription;

            _fisExceptionsCorrectionRepository.Update(correction);
            await _fisExceptionsCorrectionRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> UpdateUserPayeeFisPayeeIdAsync(UserPayeeUpdateFisPayeeIdRequest request)
        {
            try
            {
                var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == request.FisPayeeId);
                if (globalPayee == null)
                {
                    return new ServiceResponse
                    {
                        StatusCode = 404,
                        Error = "The Global Payee with the given FisPayeeId was not found"
                    };
                }

                var userPayeeListRepo = _unitOfWork.Repo<UserPayeeList>();
                var userPayeeListChangeHistoryRepo = _unitOfWork.Repo<UserPayeeListChangeHistory>();

                var userPayeeList = await userPayeeListRepo.GetAsync(x => x.Id == request.UserPayeeListId);

                if (userPayeeList == null)
                {
                    return new ServiceResponse
                    {
                        StatusCode = 404,
                        Error = "A User Payee with the given UserPayeeListId was not found"
                    };
                }

                var beforeChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
                beforeChangeHistory.ModifiedBy = "admin";
                beforeChangeHistory.ModifyDate = DateTime.Now;
                beforeChangeHistory.ModifyType = "1";
                beforeChangeHistory.Reason = "update - before";
                userPayeeListChangeHistoryRepo.Add(beforeChangeHistory);

                if (userPayeeList.PayeeId == userPayeeList.FisPayeeId)
                {
                    userPayeeList.PayeeId = request.FisPayeeId;
                }

                userPayeeList.PaymentMethod = await GetGlobalPayeePaymentMethod(userPayeeList.PayeeId);
                userPayeeList.FisPayeeId = request.FisPayeeId;
                userPayeeList.PayeeType = PayeeType.Global;
                userPayeeList.Updated = true;
                userPayeeList.LastUpdated = DateTime.Now;
                userPayeeList.LastUpdatedBy = "admin";
                userPayeeListRepo.Update(userPayeeList);

                var afterChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
                afterChangeHistory.ModifiedBy = "admin";
                afterChangeHistory.ModifyDate = DateTime.Now;
                afterChangeHistory.ModifyType = "1";
                afterChangeHistory.Reason = "update - after";
                userPayeeListChangeHistoryRepo.Add(afterChangeHistory);

                await _unitOfWork.CommitAsync();

                return new ServiceResponse
                {
                    StatusCode = 200
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "PayeeService threw an Exception");
                return new ServiceResponse
                {
                    StatusCode = 500,
                    Error = "An Unexpected Error Occurred"
                };
            }
            
        }

        private static bool IsUserPayeeDuplicate(UserPayeeData a, UserPayeeData b)
        {
            if (a.PayeeType != b.PayeeType)
            {
                return false;
            }

            if (a.PayeeType == PayeeType.Personal)
            {
                return a.Payee?.PayeeName == b.Payee?.PayeeName &&
                    a.Payee?.ZipCode == b.Payee?.ZipCode &&
                    a.UsersAccountAtPayee == b.UsersAccountAtPayee;
            }
            else
            {
                return a.FisPayeeId == b.FisPayeeId &&
                    a.UsersAccountAtPayee == b.UsersAccountAtPayee;
            }
        }
    }
}
