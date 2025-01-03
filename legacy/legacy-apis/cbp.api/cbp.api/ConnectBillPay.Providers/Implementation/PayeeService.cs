using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Abstract;
using ConnectBillPay.Services.Classes;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace ConnectBillPay.Services.Implementation
{
    public class PayeeService : IPayeeService
    {
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly ICuGenericRepository<PersonalPayee> _personalPayeeRepository;
        private readonly ICuGenericRepository<PersonalPayeeChangeHistory> _personalPayeeHistoryRepository;
        private readonly ICuGenericRepository<Payment> _paymentRepository;
        private readonly ICuGenericRepository<UserPayeeList> _userPayeeListRepository;
        private readonly ICuGenericRepository<UserPayeeListChangeHistory> _userPayeeListHistoryRepository;
        private readonly IMapper _mapper;
        private readonly IFisApiService _fisApiService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ConnectBillPaySettings _settings;
        private readonly ICuGenericRepository<PaymentHistory> _paymentHistoryRepository;
        private readonly ILogger<PayeeService> _logger;
        private readonly ICuGenericRepository<Frequency> _frequencyRepository;

        public PayeeService(IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository,
            ICuGenericRepository<UserPayeeList> userPayeeListRepository,
            ICuGenericRepository<PersonalPayee> personalPayeeRepository,
            ICuGenericRepository<UserPayeeListChangeHistory> userPayeeListHistoryRepository,
            ICuGenericRepository<PersonalPayeeChangeHistory> personalPayeeHistoryRepository,
            ICuGenericRepository<Payment> paymentRepository,
            IMapper mapper,
            IFisApiService fisApiService,
            IUnitOfWork unitOfWork,
            ConnectBillPaySettings settings,
            ICuGenericRepository<PaymentHistory> paymentHistoryRepository,
            ILogger<PayeeService> logger,
            ICuGenericRepository<Frequency> frequencyRepository)
        {
            _globalPayeeRepository = globalPayeeRepository;
            _userPayeeListRepository = userPayeeListRepository;
            _personalPayeeRepository = personalPayeeRepository;
            _userPayeeListHistoryRepository = userPayeeListHistoryRepository;
            _personalPayeeHistoryRepository = personalPayeeHistoryRepository;
            _paymentRepository = paymentRepository;
            _mapper = mapper;
            _fisApiService = fisApiService;
            _unitOfWork = unitOfWork;
            _settings = settings;
            _paymentHistoryRepository = paymentHistoryRepository;
            _logger = logger;
            _frequencyRepository = frequencyRepository;
        }

        public async Task<ServiceResponse<AddPayeeResponse>> AddPayee(PayeeAddRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.PayeeType))
            {
                return new ServiceResponse<AddPayeeResponse>
                {
                    Object = new AddPayeeResponse
                    {
                        UserPayeeListId = string.Empty,
                        PayeeId = string.Empty
                    },
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            // Global and OnUs
            if ((request.PayeeType == PayeeType.Global || request.PayeeType == PayeeType.OnUs || request.PayeeType == PayeeType.OffHost) &&
                (string.IsNullOrEmpty(request.UsersAccountAtPayee) || string.IsNullOrEmpty(request.NameOnAccount)))
            {
                return new ServiceResponse<AddPayeeResponse>
                {
                    Object = new AddPayeeResponse
                    {
                        UserPayeeListId = string.Empty,
                        PayeeId = string.Empty
                    },
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            // Personal
            if (request.PayeeType == PayeeType.Personal &&
                (string.IsNullOrEmpty(request.MemberId) || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Address1) ||
                string.IsNullOrEmpty(request.City) || string.IsNullOrEmpty(request.State) || string.IsNullOrEmpty(request.PostalCode) ||
                string.IsNullOrEmpty(request.Country) || string.IsNullOrEmpty(request.NameOnAccount) || string.IsNullOrEmpty(request.UsersAccountAtPayee)))
            {
                return new ServiceResponse<AddPayeeResponse>
                {
                    Object = new AddPayeeResponse
                    {
                        UserPayeeListId = string.Empty,
                        PayeeId = string.Empty
                    },
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            // OnUs Payee
            if (request.PayeeType == PayeeType.OnUs)
            {
                if (string.IsNullOrEmpty(request.PayeeId) ||
                    !_settings.OnUsPayeeIds.Contains(request.PayeeId))
                {
                    return new ServiceResponse<AddPayeeResponse>
                    {
                        Object = new AddPayeeResponse
                        {
                            UserPayeeListId = string.Empty,
                            PayeeId = string.Empty
                        },
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                }

                var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == request.PayeeId);
                if (globalPayee == null)
                {
                    return new ServiceResponse<AddPayeeResponse>
                    {
                        Object = new AddPayeeResponse
                        {
                            UserPayeeListId = string.Empty,
                            PayeeId = string.Empty
                        },
                        StatusCode = 404
                    };
                }
            }
            else if (request.PayeeType == PayeeType.OffHost)
            {
                if (string.IsNullOrEmpty(request.PayeeId) ||
                    !_settings.OnUsOffHostCreditCardPayeeIds.Contains(request.PayeeId))
                {
                    return new ServiceResponse<AddPayeeResponse>
                    {
                        Object = new AddPayeeResponse
                        {
                            UserPayeeListId = string.Empty,
                            PayeeId = string.Empty
                        },
                        StatusCode = StatusCodes.Status400BadRequest
                    };
                }

                var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == request.PayeeId);
                if (globalPayee == null)
                {
                    return new ServiceResponse<AddPayeeResponse>
                    {
                        Object = new AddPayeeResponse
                        {
                            UserPayeeListId = string.Empty,
                            PayeeId = string.Empty
                        },
                        StatusCode = 404
                    };
                }
            }

            var payeeId = request.PayeeId;

            if (request.PayeeType == PayeeType.Global || request.PayeeType == PayeeType.Personal)
            {
                payeeId = await GetPayeeIdByFactor(request.Address1, request.City, request.Name, request.PostalCode, request.State, request.UsersAccountAtPayee);
            }

            var payeeType = request.PayeeType;
            if (payeeType == PayeeType.Global || payeeType == PayeeType.Personal)
            {
                // Default payee type to global until we determine it's not
                payeeType = PayeeType.Global;
            }

            // Payee was not found on FIS side (Global) must be personal payee
            if (payeeId == null)
            {
                var existingPayees = await _userPayeeListHistoryRepository.GetUserPayees(request.MemberId);
                var existingPayeeCount = existingPayees.FindAll(x => x.Payee?.PayeeName == request.Name &&
                                                                     x.Payee?.ZipCode == request.PostalCode &&
                                                                     x.UsersAccountAtPayee == request.UsersAccountAtPayee)?.Count();

                if (existingPayeeCount > 0)
                {
                    return new ServiceResponse<AddPayeeResponse>
                    {
                        Object = new AddPayeeResponse
                        {
                            UserPayeeListId = string.Empty,
                            PayeeId = string.Empty
                        },
                        StatusCode = StatusCodes.Status409Conflict
                    };
                }

                payeeId = _unitOfWork.Repo<PersonalPayee>().GeneratePersonalPayeeId();

                payeeType = PayeeType.Personal;

                var personalPayee = new PersonalPayee
                {
                    AddressLine1 = request.Address1,
                    AddressLine2 = request.Address2,
                    AddressLine3 = request.Address3,
                    City = request.City,
                    CountryCode = request.Country,
                    LastUpdated = DateTime.Now,
                    LastUpdatedBy = request.MemberId,
                    PayeeId = payeeId,
                    PayeeName = request.Name,
                    PhoneNumber = request.Phone,
                    State = request.State,
                    ZipCode = request.PostalCode
                };

                _unitOfWork.Repo<PersonalPayee>().Add(personalPayee);
            }

            var paymentMethod = PaymentMethods.Check; // Default payment method to check

            // If it's a global payee then we need to determine the payment method
            if (payeeType == PayeeType.Global)
            {
                paymentMethod = await GetGlobalPayeePaymentMethod(payeeId);
            }
            else if (payeeType == PayeeType.OnUs ||
                payeeType == PayeeType.OffHost)
            {
                paymentMethod = PaymentMethods.Electronic;
            }

            // generate user payee list id
            var userPayeeListId = await _unitOfWork.Repo<UserPayeeList>().GenerateUserPayeeListIdAsync();

            // Update the UserPayee based on information from global or personal payee
            var userPayeeList = new UserPayeeList
            {
                Id = userPayeeListId,
                LastUpdatedBy = request.MemberId,
                NameOnAccount = request.NameOnAccount,
                NickName = request.NickName,
                MemberId = request.MemberId,
                PayeeId = payeeId,
                PayeeType = payeeType,
                PaymentMethod = paymentMethod,
                UsersAccountAtPayee = request.UsersAccountAtPayee,
                Favorite = request.Favorite,
                Updated = true
            };

            if (payeeType == PayeeType.Global ||
                payeeType == PayeeType.OnUs ||
                payeeType == PayeeType.OffHost)
            {
                userPayeeList.FisPayeeId = payeeId;
            }

            _unitOfWork.Repo<UserPayeeList>().Add(userPayeeList);
            await _unitOfWork.CommitAsync();

            return new ServiceResponse<AddPayeeResponse>
            {
                Object = new AddPayeeResponse
                {
                    UserPayeeListId = userPayeeListId,
                    PayeeId = userPayeeList.PayeeId
                },
                StatusCode = StatusCodes.Status201Created
            };
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

        public async Task<ServiceResponse> DeleteUserPayee(string userPayeeListId, string memberId)
        {
            //Check to see if there are pending payments
            var payments = (await _paymentRepository.FindAsync(x => x.UserPayeeListId == userPayeeListId && x.MemberId == memberId && x.StatusCode == 100))
                .ToList();
            if (payments.Count > 0)
            {
                return new ServiceResponse
                {
                    StatusCode = 400
                };
            }

            // set UserPayee to deleted and update change history
            var userPayeeList = await _unitOfWork.Repo<UserPayeeList>().GetAsync(x => x.Id == userPayeeListId && !x.Deleted);
            if (userPayeeList == null)
            {
                return new ServiceResponse
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            // add before change history
            var beforeUserPayeeListChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
            beforeUserPayeeListChangeHistory.ModifyType = "1";
            beforeUserPayeeListChangeHistory.ModifyDate = DateTime.Now;
            beforeUserPayeeListChangeHistory.ModifiedBy = memberId;
            beforeUserPayeeListChangeHistory.Reason = "deleted - before";
            _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(beforeUserPayeeListChangeHistory);

            // edit user payee list
            userPayeeList.Deleted = true;
            userPayeeList.LastUpdated = DateTime.Now;
            userPayeeList.LastUpdatedBy = memberId;
            _unitOfWork.Repo<UserPayeeList>().Update(userPayeeList);

            // add after change history
            var afterUserPayeeListChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);
            afterUserPayeeListChangeHistory.ModifyType = "1";
            afterUserPayeeListChangeHistory.ModifyDate = DateTime.Now;
            afterUserPayeeListChangeHistory.ModifiedBy = memberId;
            afterUserPayeeListChangeHistory.Reason = "deleted - after";
            _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(afterUserPayeeListChangeHistory);

            //Check to see if it is a global payee
            if (userPayeeList.PayeeType.ToUpper() == "P")
            {
                // update personal payee to deleted
                var personalPayee = await _unitOfWork.Repo<PersonalPayee>().GetAsync(x => x.PayeeId == userPayeeList.PayeeId);

                // add before change history
                var beforePersonalPayeeChangeHistory = _mapper.Map<PersonalPayeeChangeHistory>(personalPayee);
                beforePersonalPayeeChangeHistory.ModifyType = "1";
                beforePersonalPayeeChangeHistory.ModifyDate = DateTime.Now;
                beforePersonalPayeeChangeHistory.ModifiedBy = memberId;
                beforePersonalPayeeChangeHistory.Reason = "deleted - before";
                _unitOfWork.Repo<PersonalPayeeChangeHistory>().Add(beforePersonalPayeeChangeHistory);

                // edit personal payee
                personalPayee.Deleted = true;
                personalPayee.LastUpdated = DateTime.Now;
                personalPayee.LastUpdatedBy = memberId;
                _unitOfWork.Repo<PersonalPayee>().Update(personalPayee);

                // add after change history
                var afterPersonalPayeeChangeHistory = _mapper.Map<PersonalPayeeChangeHistory>(personalPayee);
                afterPersonalPayeeChangeHistory.ModifyType = "1";
                afterPersonalPayeeChangeHistory.ModifyDate = DateTime.Now;
                afterPersonalPayeeChangeHistory.ModifiedBy = memberId;
                afterPersonalPayeeChangeHistory.Reason = "deleted - after";
                _unitOfWork.Repo<PersonalPayeeChangeHistory>().Add(afterPersonalPayeeChangeHistory);
            }

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse> EditGlobalPayee(GlobalPayeeEditRequest request)
        {
            var userPayeeList = await _unitOfWork.Repo<UserPayeeList>().GetAsync(x => x.Id == request.UserPayeeListId && !x.Deleted);
            if (userPayeeList == null)
            {
                return new ServiceResponse
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            var beforeUserPayeeListChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);

            // only log if something other than favorite or nickname was changed
            var insertChangeHistory = userPayeeList.Active != request.Active ||
                userPayeeList.NameOnAccount != request.AccountName ||
                userPayeeList.UsersAccountAtPayee != request.AccountNumber ||
                userPayeeList.PayeeId != request.PayeeId;

            if (userPayeeList.PayeeType == PayeeType.Global && userPayeeList.UsersAccountAtPayee != request.AccountNumber)
            {
                var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == userPayeeList.FisPayeeId);
                var newPayeeId = await DoesPayeeExistAtFis(globalPayee.PayeeName, globalPayee.ZipCode, request.AccountNumber);

                if (string.IsNullOrEmpty(newPayeeId)) // no matching global payee at FIS, switch payee to Personal
                {
                    var personalPayeeId = _unitOfWork.Repo<PersonalPayee>().GeneratePersonalPayeeId();
                    var personalPayee = new PersonalPayee
                    {
                        AddressLine1 = globalPayee.AddressLine1,
                        AddressLine2 = globalPayee.AddressLine2,
                        City = globalPayee.City,
                        CountryCode = globalPayee.CountryCode,
                        LastUpdated = DateTime.Now,
                        LastUpdatedBy = request.MemberId,
                        PayeeId = personalPayeeId,
                        PayeeName = globalPayee.PayeeName,
                        PhoneNumber = globalPayee.PhoneNumber,
                        State = globalPayee.State,
                        ZipCode = globalPayee.ZipCode
                    };
                    _unitOfWork.Repo<PersonalPayee>().Add(personalPayee);

                    userPayeeList.PayeeType = PayeeType.Personal;
                    userPayeeList.PaymentMethod = PaymentMethods.Check;
                    userPayeeList.PayeeId = personalPayeeId;
                    userPayeeList.FisPayeeId = null; // clear fis payee id

                    insertChangeHistory = true;
                    userPayeeList.Updated = true; // Send to FIS
                }
                else if (newPayeeId.Trim() != globalPayee.InternalPayeeId.Trim()) // global payee found is different, update reference and method
                {
                    userPayeeList.PaymentMethod = await GetGlobalPayeePaymentMethod(newPayeeId);
                    userPayeeList.PayeeId = newPayeeId;
                    userPayeeList.FisPayeeId = newPayeeId;

                    insertChangeHistory = true;
                    userPayeeList.Updated = true; // Send to FIS
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(request.PayeeId))
                {
                    userPayeeList.PayeeId = request.PayeeId;
                }
            }

            // before
            if (insertChangeHistory)
            {
                beforeUserPayeeListChangeHistory.ModifyType = "1";
                beforeUserPayeeListChangeHistory.ModifyDate = DateTime.Now;
                beforeUserPayeeListChangeHistory.ModifiedBy = request.MemberId;
                beforeUserPayeeListChangeHistory.Reason = "edited - before";
                _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(beforeUserPayeeListChangeHistory);
            }

            userPayeeList.Active = request.Active;
            userPayeeList.Favorite = request.Favorite;
            userPayeeList.NameOnAccount = request.AccountName;
            userPayeeList.NickName = request.Nickname;
            userPayeeList.UsersAccountAtPayee = request.AccountNumber;
            userPayeeList.LastUpdated = DateTime.Now;
            userPayeeList.LastUpdatedBy = request.MemberId;

            _unitOfWork.Repo<UserPayeeList>().Update(userPayeeList);

            // after
            if (insertChangeHistory)
            {
                var userPayeeListChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);

                userPayeeListChangeHistory.ModifyType = "1";
                userPayeeListChangeHistory.ModifyDate = DateTime.Now;
                userPayeeListChangeHistory.ModifiedBy = request.MemberId;
                userPayeeListChangeHistory.Reason = "edited - after";
                _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(userPayeeListChangeHistory);
            }

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse> EditPersonalPayee(PersonalPayeeEditRequest request)
        {
            // edit user payee
            var userPayeeList = await _unitOfWork.Repo<UserPayeeList>().GetAsync(x => x.Id == request.UserPayeeListId && x.MemberId == request.MemberId && !x.Deleted);
            if (userPayeeList == null || userPayeeList.PayeeType.ToUpper() != "P")
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            var personalPayee = await _unitOfWork.Repo<PersonalPayee>().GetAsync(x => x.PayeeId == userPayeeList.PayeeId && !x.Deleted);
            if (personalPayee == null)
            {
                // invalid memberId or payeeId or payee is deleted
                return new ServiceResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            // check for and insert change history
            // only log if something other than favorite or nickname was changed
            var insertUserPayeeListChangeHistory = userPayeeList.Active != request.Active ||
                userPayeeList.NameOnAccount != request.NameOnAccount ||
                userPayeeList.UsersAccountAtPayee != request.UsersAccountAtPayee;

            // Set Update Flag for FIS
            var setUpdateFlag = userPayeeList.UsersAccountAtPayee != request.UsersAccountAtPayee ||
                                personalPayee.AddressLine1 != request.AddressLine1 ||
                                personalPayee.AddressLine2 != request.AddressLine2 ||
                                personalPayee.AddressLine3 != request.AddressLine3 ||
                                personalPayee.City != request.City ||
                                personalPayee.State != request.State ||
                                personalPayee.ZipCode != request.ZipCode;

            var beforeUserPayeeListChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);

            if (setUpdateFlag)
            {
                var newPayeeId = await GetPayeeIdByFactor(request.AddressLine1, request.City, request.PayeeName, request.ZipCode, request.State, request.UsersAccountAtPayee);

                if (!string.IsNullOrEmpty(newPayeeId) && newPayeeId != userPayeeList.FisPayeeId) // global payee found
                {
                    userPayeeList.FisPayeeId = newPayeeId;
                    userPayeeList.PayeeId = newPayeeId;
                    userPayeeList.PayeeType = PayeeType.Global;
                    userPayeeList.PaymentMethod = await GetGlobalPayeePaymentMethod(newPayeeId);
                    insertUserPayeeListChangeHistory = true;
                }

                userPayeeList.Updated = true;  // Send update flag to FIS for Account or Address Change
            }

            // before
            if (insertUserPayeeListChangeHistory)
            {
                beforeUserPayeeListChangeHistory.ModifyType = "1";
                beforeUserPayeeListChangeHistory.ModifyDate = DateTime.Now;
                beforeUserPayeeListChangeHistory.ModifiedBy = request.MemberId;
                beforeUserPayeeListChangeHistory.Reason = "updated - before";

                _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(beforeUserPayeeListChangeHistory);
            }

            userPayeeList.UsersAccountAtPayee = request.UsersAccountAtPayee;
            userPayeeList.NameOnAccount = request.NameOnAccount;
            userPayeeList.NickName = request.NickName;
            userPayeeList.Active = request.Active;
            userPayeeList.Favorite = request.Favorite;

            userPayeeList.LastUpdated = DateTime.Now;
            userPayeeList.LastUpdatedBy = request.MemberId;

            _unitOfWork.Repo<UserPayeeList>().Update(userPayeeList);

            // after
            if (insertUserPayeeListChangeHistory)
            {
                var userPayeeListChangeHistory = _mapper.Map<UserPayeeListChangeHistory>(userPayeeList);

                userPayeeListChangeHistory.ModifyType = "1";
                userPayeeListChangeHistory.ModifyDate = DateTime.Now;
                userPayeeListChangeHistory.ModifiedBy = request.MemberId;
                userPayeeListChangeHistory.Reason = "updated - after";

                _unitOfWork.Repo<UserPayeeListChangeHistory>().Add(userPayeeListChangeHistory);
            }

            var insertPersonPayeeChangeHistory = personalPayee.PayeeName != request.PayeeName ||
                personalPayee.AddressLine1 != request.AddressLine1 ||
                personalPayee.AddressLine2 != request.AddressLine2 ||
                personalPayee.AddressLine3 != request.AddressLine3 ||
                personalPayee.City != request.City ||
                personalPayee.State != request.State ||
                personalPayee.ZipCode != request.ZipCode ||
                personalPayee.PhoneNumber != request.PhoneNumber ||
                personalPayee.CountryCode != request.CountryCode;

            // before change history
            if (insertPersonPayeeChangeHistory)
            {
                if (string.IsNullOrEmpty(personalPayee.PhoneNumber))
                {
                    personalPayee.PhoneNumber = string.Empty;
                }

                var personalPayeeChangeHistory = _mapper.Map<PersonalPayeeChangeHistory>(personalPayee);

                personalPayeeChangeHistory.ModifyType = "1";
                personalPayeeChangeHistory.ModifyDate = DateTime.Now;
                personalPayeeChangeHistory.ModifiedBy = request.MemberId;
                personalPayeeChangeHistory.Reason = "updated - before";

                _unitOfWork.Repo<PersonalPayeeChangeHistory>().Add(personalPayeeChangeHistory);
            }

            // edit personal payee
            personalPayee.PayeeName = request.PayeeName;
            personalPayee.AddressLine1 = request.AddressLine1;
            personalPayee.AddressLine2 = request.AddressLine2;
            personalPayee.AddressLine3 = request.AddressLine3;
            personalPayee.City = request.City;
            personalPayee.State = request.State;
            personalPayee.ZipCode = request.ZipCode;
            personalPayee.PhoneNumber = request.PhoneNumber;
            personalPayee.CountryCode = request.CountryCode;

            personalPayee.LastUpdated = DateTime.Now;
            personalPayee.LastUpdatedBy = request.MemberId;

            _unitOfWork.Repo<PersonalPayee>().Update(personalPayee);

            // after change history
            if (insertPersonPayeeChangeHistory)
            {
                if (string.IsNullOrEmpty(personalPayee.PhoneNumber))
                {
                    personalPayee.PhoneNumber = string.Empty;
                }

                var personalPayeeChangeHistory = _mapper.Map<PersonalPayeeChangeHistory>(personalPayee);

                personalPayeeChangeHistory.ModifyType = "1";
                personalPayeeChangeHistory.ModifyDate = DateTime.Now;
                personalPayeeChangeHistory.ModifiedBy = request.MemberId;
                personalPayeeChangeHistory.Reason = "updated - after";

                _unitOfWork.Repo<PersonalPayeeChangeHistory>().Add(personalPayeeChangeHistory);
            }

            await _unitOfWork.CommitAsync();

            return new ServiceResponse
            {
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<GlobalPayeeResponse>> GetGlobalPayeeAsync(string fisPayeeId)
        {
            var payee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == fisPayeeId);
            if (payee == null)
            {
                return new ServiceResponse<GlobalPayeeResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<GlobalPayeeResponse>(payee);
            return new ServiceResponse<GlobalPayeeResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }

        public async Task<ServiceResponse<List<PayeeResponse>>> GetGlobalPayeesByName(string partialName)
        {
            var globalPayees = (await _globalPayeeRepository.FindAsync(x => x.PayeeName.StartsWith(partialName) && x.PayeeStatus.ToUpper() == "ACTIVE")).ToList();
            var payees = FilterGlobalPayee(globalPayees).Select(MapGlobalPayee).OrderBy(x => x.PayeeName).ToList();

            return new ServiceResponse<List<PayeeResponse>>
            {
                Object = payees,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<List<PayeeResponse>>> GetGlobalPayeesByZip(string partialZip)
        {
            var globalPayees = (await _globalPayeeRepository.FindAsync(x => x.ZipCode.StartsWith(partialZip) && x.PayeeStatus.ToUpper() == "ACTIVE")).ToList();
            var payees = FilterGlobalPayee(globalPayees).Select(MapGlobalPayee).OrderBy(x => x.PayeeName).ToList();

            return new ServiceResponse<List<PayeeResponse>>
            {
                Object = payees,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<List<PayeeResponse>>> GetGlobalPayeesByNameZip(string partialName, string partialZip)
        {
            var globalPayees = (await _globalPayeeRepository.FindAsync(x => x.PayeeName.StartsWith(partialName) && x.ZipCode.StartsWith(partialZip) && x.PayeeStatus.ToUpper() == "ACTIVE")).ToList();
            var payees = FilterGlobalPayee(globalPayees).Select(MapGlobalPayee).OrderBy(x => x.PayeeName).ToList();

            return new ServiceResponse<List<PayeeResponse>>
            {
                Object = payees,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<UserPayeeResponse>> GetUserPayee(string memberId, string payeeId, bool active = true)
        {
            UserPayeeList userPayeeList = null;
            if (active)
            {
                userPayeeList = await _userPayeeListRepository.GetAsync(x => x.MemberId == memberId && x.PayeeId == payeeId && !x.Deleted && x.Active == true);
            }
            else
            {
                userPayeeList = await _userPayeeListRepository.GetAsync(x => x.MemberId == memberId && x.PayeeId == payeeId && !x.Deleted);
            }

            if (userPayeeList == null)
            {
                return new ServiceResponse<UserPayeeResponse>
                {
                    Object = null,
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            PayeeResponse payee = await GetPayee(payeeId, userPayeeList.PayeeType, userPayeeList.FisPayeeId);

            if (payee == null)
            {
                return new ServiceResponse<UserPayeeResponse>
                {
                    Object = null,
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            var response = new UserPayeeResponse
            {
                Payee = payee,
                UserPayeeListId = userPayeeList.Id.ToString(),
                MemberId = userPayeeList.MemberId,
                UsersAccountAtPayee = userPayeeList.UsersAccountAtPayee,
                NameOnAccount = userPayeeList.NameOnAccount,
                NickName = userPayeeList.NickName,
                AttentionLine = userPayeeList.AttentionLine,
                PaymentMethod = userPayeeList.PaymentMethod,
                PayeeType = userPayeeList.PayeeType,
                Active = userPayeeList.Active ?? false,
                Favorite = userPayeeList.Favorite,
            };

            return new ServiceResponse<UserPayeeResponse>
            {
                Object = response,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<List<UserPayeeResponse>>> GetUserPayees(string memberId)
        {
            var userPayees = await _userPayeeListHistoryRepository.GetUserPayees(memberId);
            var userPayeesResponse = new List<UserPayeeResponse>();
            foreach (var userPayee in userPayees)
            {
                var userResponse = _mapper.Map<UserPayeeResponse>(userPayee);
                if (!string.IsNullOrWhiteSpace(userPayee.Payee.PayeeName))
                {
                    userResponse.Payee = _mapper.Map<PayeeResponse>(userPayee.Payee);
                }
                else
                {
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == userPayee.Payee.PayeeId);
                    if (globalPayee != null)
                    {
                        userResponse.Payee = _mapper.Map<PayeeResponse>(globalPayee);
                        userResponse.Payee.PayeeId = globalPayee.InternalPayeeId.Trim();
                    }
                    else
                    {
                        _logger.LogError("Failed to load payee information for PayeeId: " + userPayee.Payee.PayeeId);
                        continue;
                    }
                }
                userPayeesResponse.Add(userResponse);
            }

            var sortedList = userPayeesResponse.OrderBy(x => string.IsNullOrEmpty(x.NickName) ? x.Payee.PayeeName : x.NickName).ToList();

            return new ServiceResponse<List<UserPayeeResponse>>
            {
                Object = sortedList,
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<List<UserPayeeWithPaymentsResponse>>> GetUserPayeesWithPayments(string memberId)
        {
            var payments = await _paymentRepository.GetPendingPaymentsAsync(memberId);
            var userPayees = await _userPayeeListHistoryRepository.GetUserPayees(memberId);
            var lastPayments = await _userPayeeListRepository.GetPayeeLastPaymentsAsync(memberId);
            var userPayeesWithPayeeList = new List<UserPayeeWithPaymentsResponse>();
            var globalPayees = new Dictionary<string, GlobalPayee>();

            foreach (var userPayee in userPayees)
            {
                var userResponse = _mapper.Map<UserPayeeResponse>(userPayee);
                if (!string.IsNullOrWhiteSpace(userPayee.Payee.PayeeName))
                {
                    userResponse.Payee = _mapper.Map<PayeeResponse>(userPayee.Payee);
                }
                else
                {
                    if (globalPayees.TryGetValue(userPayee.Payee.PayeeId, out var payee))
                    {
                        userResponse.Payee = _mapper.Map<PayeeResponse>(payee);
                        userResponse.Payee.PayeeId = payee.InternalPayeeId.Trim();
                    }
                    else
                    {
                        payee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == userPayee.Payee.PayeeId);
                        if (payee is not null)
                        {
                            globalPayees.Add(userPayee.Payee.PayeeId, payee);
                            userResponse.Payee = _mapper.Map<PayeeResponse>(payee);
                            userResponse.Payee.PayeeId = payee.InternalPayeeId.Trim();
                        }
                        else
                        {
                            _logger.LogError("Failed to load payee information for PayeeId: " + userPayee.Payee.PayeeId);
                            continue;
                        }
                    }
                }

                var payeePayments = new List<MemberPayment>();
                var payeeIdPayments = payments.Where(x => x.PayeeID == userResponse.Payee.PayeeId).ToList();

                foreach (var payment in payeeIdPayments)
                {
                    var tempPayment = new MemberPayment
                    {
                        Id = payment.Id,
                        UserPayeeListId = payment.UserPayeeListId,
                        FundingAccount = payment.FundingAccount,
                        Amount = payment.Amount,
                        StatusCode = payment.StatusCode,
                        FriendlyName = payment.FriendlyName,
                        Memo = payment.Memo,
                        WillProcessDate = payment.WillProcessDate,
                        DeliveryDate = payment.DeliveryDate,
                        RecurringPaymentId = payment.RecurringPaymentId,
                        Suspended = payment.Suspended,
                        UsersAccountAtPayee = payment.UsersAccountAtPayee,
                        NameOnAccount = payment.NameOnAccount,
                        NickName = payment.NickName,
                        PayeeID = payment.PayeeID,
                        PayeeType = payment.PayeeType,
                        PaymentMethod = payment.PaymentMethod,
                        PayeeName = userResponse.Payee.PayeeName,
                        NumPayments = payment.NumPayments,
                        PaymentsProcessed = payment.PaymentsProcessed,
                        Frequency = payment.Frequency,
                        FrequencyDescription = payment.Frequency != null ? GetFrequency((int)payment.Frequency) : null
                    };
                    payeePayments.Add(tempPayment);
                }

                var lastPayeePayment = lastPayments.FirstOrDefault(x => x.PayeeId == userPayee.Payee.PayeeId);
                if (lastPayeePayment != null)
                {
                    var lastPaymentsDetails = await _paymentHistoryRepository.FindAsync(x => x.PayeeId == userResponse.Payee.PayeeId);
                    if (lastPaymentsDetails.Any())
                    {
                        var lastPaymentDetails = lastPaymentsDetails.MaxBy(x => x.ProcessedDate);
                        userResponse.LastPayment = new MemberPayment
                        {
                            UserPayeeListId = lastPayeePayment.UserPayeeListId,
                            FundingAccount = lastPaymentDetails?.FundingAccount,
                            Amount = lastPayeePayment.Amount ?? 0,
                            StatusCode = 102,
                            Memo = lastPaymentDetails?.Memo,
                            WillProcessDate = lastPayeePayment.LastProcDate ?? DateTime.Now,
                            DeliveryDate = lastPaymentDetails?.DeliveryDate,
                            RecurringPaymentId = lastPaymentDetails?.RecurringPaymentId,
                            UsersAccountAtPayee = lastPayeePayment.UsersAccountAtPayee,
                            NameOnAccount = lastPaymentDetails?.NameOnAccount,
                            PayeeID = lastPayeePayment.PayeeId,
                            PayeeType = lastPaymentDetails?.PayeeType,
                            PaymentMethod = lastPayeePayment.PaymentMethod,
                            PayeeName = lastPayeePayment.Name
                        };
                    }
                }

                userPayeesWithPayeeList.Add(new UserPayeeWithPaymentsResponse
                {
                    UserPayee = userResponse,
                    Payments = payeePayments
                });
            }

            var sortedList = userPayeesWithPayeeList.OrderBy(x => string.IsNullOrEmpty(x.UserPayee.NickName) ? x.UserPayee.Payee.PayeeName : x.UserPayee.NickName).ToList();

            return new ServiceResponse<List<UserPayeeWithPaymentsResponse>>
            {
                Object = userPayeesWithPayeeList,
                StatusCode = StatusCodes.Status200OK
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

        private async Task<PayeeResponse> GetPayee(string payeeId, string payeeType, string FisPayeeId)
        {
            PayeeResponse payee;

            // if there is a FisPayeeId

            // Payeeid FisPayeeId PayeeType
            //    xxxxx   null        P
            //  xxxxx      yyyyyy     G 
            //  yyyyy      yyyyyy     G
            // this is a clever way we need to refactor all of this so it is using a join
            if (payeeId != FisPayeeId && payeeType.ToUpper() == PayeeType.Global)
            {
                payeeType = PayeeType.Personal;
            }

            switch (payeeType.ToUpper())
            {
                case PayeeType.Personal:
                    var personalPayee = await _personalPayeeRepository.GetAsync(x => x.PayeeId == payeeId && !x.Deleted);
                    if (personalPayee == null)
                    {
                        return null;
                    }
                    payee = _mapper.Map<PayeeResponse>(personalPayee);
                    break;
                case PayeeType.Global:
                case PayeeType.OnUs:
                case PayeeType.OffHost:
                    var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == payeeId);
                    if (globalPayee == null)
                    {
                        return null;
                    }
                    payee = _mapper.Map<PayeeResponse>(globalPayee);
                    payee.PayeeId = globalPayee.InternalPayeeId;
                    break;
                default:
                    payee = null;
                    break;
            }

            return payee;
        }

        private async Task<string> GetPayeeIdByFactor(string address1, string city, string payeeName, string postalCode, string state, string usersAccountAtPayee)
        {
            string payeeId = null;

            // Check to see if we get a match from the Fis System
            var fisPayeeByFactorRequest = new GetFisPayeeByFactorRequest
            {
                Address1 = address1,
                City = city,
                PayeeName = payeeName,
                ZipCode = postalCode,
                State = state,
                UsersAccountAtPayee = usersAccountAtPayee
            };
            var matchPayee = await _fisApiService.GetPayeeByFactor(fisPayeeByFactorRequest);
            if (matchPayee != null && !string.IsNullOrEmpty(matchPayee.PayeeId))
            {
                payeeId = matchPayee.PayeeId;
            }

            return payeeId;
        }

        private async Task<string> DoesPayeeExistAtFis(string payeeName, string postalCode, string usersAccountAtPayee)
        {
            string payeeId = null;

            // Check to see if we get a match from the Fis System
            var fisPayeeByFactorRequest = new GetFisPayeeByFactorRequest
            {
                PayeeName = payeeName,
                ZipCode = postalCode,
                UsersAccountAtPayee = usersAccountAtPayee
            };
            var matchPayee = await _fisApiService.DoesPayeeExistAtFis(fisPayeeByFactorRequest);
            if (matchPayee != null && !string.IsNullOrEmpty(matchPayee.PayeeId))
            {
                payeeId = matchPayee.PayeeId;
            }

            return payeeId;
        }

        private PayeeResponse MapGlobalPayee(GlobalPayee payee)
        {
            var payeeResponse = _mapper.Map<PayeeResponse>(payee);
            payeeResponse.PayeeType = PayeeType.Global;

            if (_settings.OnUsEnabled)
            {
                if (_settings.OnUsPayeeIds.Contains(payeeResponse.PayeeId.Trim()))
                {
                    payeeResponse.PayeeType = PayeeType.OnUs;
                }
                else if (_settings.OnUsOffHostCreditCardPayeeIds.Contains(payeeResponse.PayeeId.Trim()))
                {
                    payeeResponse.PayeeType = PayeeType.OffHost;
                }
            }

            return payeeResponse;
        }

        public async Task<ServiceResponse<UserPayeeUpdateAccountNumberResponse>> UpdateUserPayeeAccountNumberAsync(UserPayeeUpdateAccountNumberRequest request)
        {
            var userPayeeListRepo = _unitOfWork.Repo<UserPayeeList>();
            var userPayeeListChangeHistoryRepo = _unitOfWork.Repo<UserPayeeListChangeHistory>();

            var userPayeeList = await userPayeeListRepo.GetAsync(x => x.Id == request.UserPayeeListId);

            if (userPayeeList == null)
            {
                return new ServiceResponse<UserPayeeUpdateAccountNumberResponse>
                {
                    Object = new UserPayeeUpdateAccountNumberResponse
                    {
                        ErrorMessage = "A User Payee with the given UserPayeeListId was not found"
                    },
                    StatusCode = StatusCodes.Status404NotFound
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

            return new ServiceResponse<UserPayeeUpdateAccountNumberResponse>
            {
                Object = new UserPayeeUpdateAccountNumberResponse
                {
                    ErrorMessage = string.Empty
                },
                StatusCode = StatusCodes.Status200OK
            };
        }

        public async Task<ServiceResponse<UserPayeeUpdateFisPayeeIdResponse>> UpdateUserPayeeFisPayeeIdAsync(UserPayeeUpdateFisPayeeIdRequest request)
        {

            var globalPayee = await _globalPayeeRepository.GetAsync(x => x.InternalPayeeId == request.FisPayeeId);
            if (globalPayee == null)
            {
                return new ServiceResponse<UserPayeeUpdateFisPayeeIdResponse>
                {
                    Object = new UserPayeeUpdateFisPayeeIdResponse
                    {
                        ErrorMessage = "The Global Payee with the given FisPayeeId was not found"
                    },
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            var userPayeeListRepo = _unitOfWork.Repo<UserPayeeList>();
            var userPayeeListChangeHistoryRepo = _unitOfWork.Repo<UserPayeeListChangeHistory>();

            var userPayeeList = await userPayeeListRepo.GetAsync(x => x.Id == request.UserPayeeListId);

            if (userPayeeList == null)
            {
                return new ServiceResponse<UserPayeeUpdateFisPayeeIdResponse>
                {
                    Object = new UserPayeeUpdateFisPayeeIdResponse
                    {
                        ErrorMessage = "A User Payee with the given UserPayeeListId was not found"
                    },
                    StatusCode = StatusCodes.Status404NotFound
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

            return new ServiceResponse<UserPayeeUpdateFisPayeeIdResponse>
            {
                Object = new UserPayeeUpdateFisPayeeIdResponse
                {
                    ErrorMessage = string.Empty
                },
                StatusCode = StatusCodes.Status200OK
            };
        }

        private List<GlobalPayee> FilterGlobalPayee(List<GlobalPayee> payeeList)
        {
            var filteredList = payeeList;
            foreach (var hideValue in _settings.HideFisPayeeValues)
            {
                if (string.IsNullOrEmpty(hideValue))
                {
                    continue;
                }
                filteredList = filteredList.Where(x => !x.PayeeName.Contains(hideValue.ToUpper())).ToList();
            }

            return filteredList;
        }

        private string GetFrequency(int frequencyValue)
        {
            if (frequencyValue != 0)
            {
                return _frequencyRepository.Get(x => x.Id == frequencyValue).Description;
            }
            return string.Empty;
        }
    }
}
