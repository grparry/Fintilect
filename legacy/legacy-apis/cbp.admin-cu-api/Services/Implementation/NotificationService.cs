using AutoMapper;
using ConnectBillPay.Core.Classes;
using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Responses;
using Requests.Notification;
using Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using ConnectBillPay.Core.Configuration;

namespace Services.Implementation
{
    public class NotificationService : INotificationService
    {
        private readonly IMapper _mapper;
        private readonly ICuGenericRepository<Notification> _notificationRepository;
        private readonly ICuGenericRepository<SavedNotification> _savedNotificationRepository;
        private readonly ICuGenericRepository<StatusCode> _statusCodeRepository;
        private readonly INotificationProvider _notificationProvider;
        private readonly ICuGenericRepository<CustomerInfo> _customerInfoRepository;
        private readonly IMemberProvider _memberProvider;
        private readonly ICuGenericRepository<PersonalPayee> _personalPayeeRepository;
        private readonly IWarehouseGenericRepository<GlobalPayee> _globalPayeeRepository;
        private readonly ICuGenericRepository<Payment> _paymentRepository;
        private readonly ICuGenericRepository<UserPayeeList> _userPayeeListRepository;
        private readonly ConnectBillPaySettings _settings;

        public NotificationService(IMapper mapper,
            ICuGenericRepository<Notification> notificationRepository,
            ICuGenericRepository<SavedNotification> savedNotificationRepository,
            ICuGenericRepository<StatusCode> statusCodeRepository,
            INotificationProvider notificationProvider,
            ICuGenericRepository<CustomerInfo> customerInfoRepository,
            IMemberProvider memberProvider,
            ICuGenericRepository<PersonalPayee> personalPayeeRepository,
            IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository,
            ICuGenericRepository<Payment> paymentRepository,
            ICuGenericRepository<UserPayeeList> userPayeeListRepository,
            ConnectBillPaySettings settings)
        {
            _mapper = mapper;
            _notificationRepository = notificationRepository;
            _savedNotificationRepository = savedNotificationRepository;
            _statusCodeRepository = statusCodeRepository;
            _notificationProvider = notificationProvider;
            _customerInfoRepository = customerInfoRepository;
            _memberProvider = memberProvider;
            _personalPayeeRepository = personalPayeeRepository;
            _globalPayeeRepository = globalPayeeRepository;
            _paymentRepository = paymentRepository;
            _userPayeeListRepository = userPayeeListRepository;
            _settings = settings;
        }

        public async Task<ServiceResponse> ClearSavedNotificationsAsync(DateTime clearUpToDate)
        {
            var notificationsToClear = await _savedNotificationRepository.FindAsync(x => x.Date <= clearUpToDate);

            _savedNotificationRepository.RemoveRange(notificationsToClear);
            await _savedNotificationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> CreateAsync(NotificationCreateRequest request)
        {
            var existing = await _notificationRepository.GetAsync(x => x.ErrorNumber == request.ErrorNumber || x.StatusCode == request.StatusCode);
            if (existing != null)
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            var notification = _mapper.Map<Notification>(request);

            _notificationRepository.Add(notification);
            await _notificationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 201
            };
        }

        public async Task<ServiceResponse> DeleteAsync(Guid notificationId)
        {
            var notification = await _notificationRepository.GetAsync(x => x.Id == notificationId);
            if (notification == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            _notificationRepository.Remove(notification);
            await _notificationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse<NotificationResponse>> GetAsync(Guid notificationId)
        {
            var notification = await _notificationRepository.GetAsync(x => x.Id == notificationId);
            if (notification == null)
            {
                return new ServiceResponse<NotificationResponse>
                {
                    StatusCode = 404
                };
            }

            var response = _mapper.Map<NotificationResponse>(notification);
            return new ServiceResponse<NotificationResponse>
            {
                StatusCode = 200,
                Object = response
            };
        }

        public async Task<ServiceResponse<NotificationListResponse>> GetAllAsync()
        {
            var notifications = (await _notificationRepository.AllAsync())
                .Select(x => _mapper.Map<NotificationResponse>(x))
                .ToList();

            return new ServiceResponse<NotificationListResponse>
            {
                StatusCode = 200,
                Object = new NotificationListResponse
                {
                    Notifications = notifications
                }
            };
        }

        public async Task<ServiceResponse<NotificationListResponse>> GetConfiguredAsync()
        {
            var emergeEnabled = _settings.EmergeNotificationsEnabled;
            var symmetryEnabled = _settings.SymmetryNotificationsEnabled;

            var notifications = new List<NotificationResponse>();
            if (emergeEnabled && symmetryEnabled)
            {
                notifications = (await _notificationRepository.AllAsync())
                    .Select(x => _mapper.Map<NotificationResponse>(x))
                    .ToList();
            }
            else if (symmetryEnabled)
            {
                notifications = (await _notificationRepository.AllAsync())
                    .Where(n => n.Symmetry == true)
                    .Select(x => _mapper.Map<NotificationResponse>(x))
                    .ToList();
            }
            else
            {
                notifications = (await _notificationRepository.AllAsync())
                    .Where(n => n.Emerge == true)
                    .Select(x => _mapper.Map<NotificationResponse>(x))
                    .ToList();
            }

            return new ServiceResponse<NotificationListResponse>
            {
                StatusCode = 200,
                Object = new NotificationListResponse
                {
                    Notifications = notifications
                }
            };
        }

        public async Task<ServiceResponse<SavedNotificationListResponse>> SearchAsync(SavedNotificationSearchRequest request)
        {
            IEnumerable<SavedNotification> notifications = null;
            if (request.Parameters.Length > 0)
            {
                var searchExpression = BuildSearchExpression(request.Parameters);
                notifications = await _savedNotificationRepository.FindAsync(searchExpression);
            }
            else
            {
                notifications = await _savedNotificationRepository.AllAsync();
            }

            var response = notifications.Select(_mapper.Map<SavedNotificationResponse>)
                .ToList();

            foreach (var notif in response)
            {
                var statusCode = await _statusCodeRepository.GetAsync(x => x.Code == notif.StatusCode);
                if (statusCode == null)
                {
                    continue;
                }
                notif.StatusCodeDescription = statusCode.Description;
            }

            return new ServiceResponse<SavedNotificationListResponse>
            {
                StatusCode = 200,
                Object = new SavedNotificationListResponse
                {
                    SavedNotifications = response
                }
            };
        }

        public async Task<ServiceResponse> SendCustomerNotificationAsync(NotificationSendCustomerRequest request)
        {
            var payment = await _paymentRepository.GetAsync(x => x.Id == request.PaymentId);
            var userPayeeList = await _userPayeeListRepository.GetAsync(x => x.Id == payment.UserPayeeListId);
            object payee = GetMemberPayeeAsync(userPayeeList, _personalPayeeRepository, _globalPayeeRepository);

            var customerInfo = await GetCustomerInfo(payment);

            await _notificationProvider.SendNotification(request.StatusCode, customerInfo.Email, payment, userPayeeList, customerInfo, payee);

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> SendNotificationAsync(int statusCode)
        {
            await _notificationProvider.SendNotification(statusCode, string.Empty);

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> SendSupportNotificationAsync(NotificationSendSupportRequest request)
        {
            await _notificationProvider.SendSupportNotification(request.StatusCode, request.Tokens);

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        public async Task<ServiceResponse> UpdateAsync(NotificationUpdateRequest request)
        {
            var notification = await _notificationRepository.GetAsync(x => x.Id == request.Id);
            if (notification == null)
            {
                return new ServiceResponse
                {
                    StatusCode = 404
                };
            }

            var existing = await _notificationRepository.GetAsync(x => x.ErrorNumber == request.ErrorNumber || x.StatusCode == request.StatusCode);
            if (existing != null && existing.Id != notification.Id) // cannot update to another notification's code
            {
                return new ServiceResponse
                {
                    StatusCode = 409
                };
            }

            notification.MatchMode = request.MatchMode;
            notification.MatchOrder = request.MatchOrder;
            notification.MatchText = request.MatchText;
            notification.MessageSubject = request.MessageSubject;
            notification.MessageBody = request.MessageBody;
            notification.EmailMember = request.EmailMember;
            notification.EmailMemberServices = request.EmailMemberServices;
            notification.EmailSysOp = request.EmailSysOp;
            notification.Notes = request.Notes;

            if (request.Symmetry != null)
            {
                notification.Symmetry = request.Symmetry ?? false;
            }

            if (request.Emerge != null)
            {
                notification.Emerge = request.Emerge ?? false;
            }

            _notificationRepository.Update(notification);
            await _notificationRepository.SaveChangesAsync();

            return new ServiceResponse
            {
                StatusCode = 200
            };
        }

        private static Expression AppendAndAlsoExpression(Expression current, Expression value)
        {
            if (current == null)
            {
                return value;
            }
            return Expression.AndAlso(current, value);
        }

        private static Expression AppendOrElseExpression(Expression current, Expression value)
        {
            if (current == null)
            {
                return value;
            }
            return Expression.OrElse(current, value);
        }

        private static Expression<Func<SavedNotification, bool>> BuildSearchExpression(IEnumerable<SavedNotificationSearchParameter> parameters)
        {
            Expression expression = null;
            var expressionParameter = Expression.Parameter(typeof(SavedNotification), "x");
            foreach (var parameter in parameters)
            {
                if (expression == null)
                {
                    expression = GetExpressionFromParameter(expressionParameter, parameter);
                }
                else
                {
                    expression = Expression.AndAlso(expression, GetExpressionFromParameter(expressionParameter, parameter));
                }
            }
            return Expression.Lambda<Func<SavedNotification, bool>>(expression, expressionParameter);
        }

        private static Expression GetExpressionFromParameter(ParameterExpression parameter, SavedNotificationSearchParameter searchParameter)
        {
            return searchParameter.Type switch
            {
                SavedNotificationSearchParameterType.DateRange => GetDateRangeExpression(parameter, searchParameter),
                SavedNotificationSearchParameterType.MemberEmail => GetMemberEmailExpression(parameter, searchParameter),
                SavedNotificationSearchParameterType.MemberId => GetMemberIdExpression(parameter, searchParameter),
                SavedNotificationSearchParameterType.PaymentDate => GetPaymentDateExpression(parameter, searchParameter),
                SavedNotificationSearchParameterType.PaymentId => GetPaymentIdExpression(parameter, searchParameter),
                _ => Expression.Constant(true),
            };
        }

        private async Task<CustomerInfo> GetCustomerInfo(Payment payment)
        {
            var customerInfo = await _customerInfoRepository.GetAsync(x => x.MemberId == payment.MemberId);
            if (customerInfo == null) // no customer info stored yet, check core/provider for member information
            {
                var memberResponse = await _memberProvider.GetMember(payment.MemberId);

                if (!memberResponse.Success)
                {
                    // log error, failed to get member information
                    return null;
                }

                var member = memberResponse.Member;
                customerInfo = new CustomerInfo
                {
                    MemberId = payment.MemberId,
                    Address1 = member.AddressLine1,
                    Address2 = member.AddressLine2,
                    Email = member.EmailAddress,
                    City = member.City,
                    State = member.State,
                    First = member.FirstName,
                    Last = member.LastName,
                    Middle = member.MiddleInitial,
                    HomePhone = member.PrimaryPhoneNumber,
                    ZipCode = member.ZipCode
                };
            }

            return customerInfo;
        }

        private static Expression GetDateRangeExpression(ParameterExpression parameter, SavedNotificationSearchParameter searchParameter)
        {
            if (!DateTime.TryParse(searchParameter.Value, out var startDate) ||
                !DateTime.TryParse(searchParameter.Value2, out var endDate))
            {
                return Expression.Constant(false);
            }

            startDate = startDate.Date;
            endDate = endDate.Date.AddDays(1);

            var memberInfo = GetMember((SavedNotification x) => x.Date);
            return Expression.AndAlso(
                Expression.GreaterThanOrEqual(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(startDate)),
                Expression.LessThan(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(endDate)));
        }

        private static Expression GetPaymentDateExpression(ParameterExpression parameter, SavedNotificationSearchParameter searchParameter)
        {
            if (!DateTime.TryParse(searchParameter.Value, out var date))
            {
                return Expression.Constant(false);
            }

            date = date.Date;

            var memberInfo = GetMember((SavedNotification x) => x.PaymentDate);
            var nullableMemberInfo = GetMember((DateTime? x) => x.Value);
            var dateMemberInfo = GetMember((DateTime x) => x.Date);
            return Expression.AndAlso(
                Expression.NotEqual(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(null)),
                Expression.Equal(Expression.MakeMemberAccess(Expression.MakeMemberAccess(Expression.MakeMemberAccess(parameter, memberInfo), nullableMemberInfo), dateMemberInfo), Expression.Constant(date)));
        }

        private static Expression GetPaymentIdExpression(ParameterExpression parameter, SavedNotificationSearchParameter searchParameter)
        {
            var memberInfo = GetMember((SavedNotification x) => x.PaymentId);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(searchParameter.Value));
        }

        private static Expression GetMemberEmailExpression(ParameterExpression parameter, SavedNotificationSearchParameter searchParameter)
        {
            var memberInfo = GetMember((SavedNotification x) => x.MemberEmail);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(searchParameter.Value));
        }

        private static Expression GetMemberIdExpression(ParameterExpression parameter, SavedNotificationSearchParameter searchParameter)
        {
            var memberInfo = GetMember((SavedNotification x) => x.MemberId);
            return Expression.Equal(Expression.MakeMemberAccess(parameter, memberInfo), Expression.Constant(searchParameter.Value));
        }

        private static MemberInfo GetMember<T, TMember>(Expression<Func<T, TMember>> expression)
        {
            if (expression.Body is not MemberExpression memberExpression)
            {
                throw new InvalidOperationException("Invalid expression provided");
            }
            return memberExpression.Member;
        }

        public static async Task<object> GetMemberPayeeAsync(UserPayeeList userPayeeList, ICuGenericRepository<PersonalPayee> personalPayeeRepository, IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository)
        {
            if (userPayeeList.PayeeType == PayeeType.Personal ||
                userPayeeList.PayeeId != userPayeeList.FisPayeeId)
            {
                return await personalPayeeRepository.GetAsync(x => x.PayeeId == userPayeeList.PayeeId);
            }

            return await globalPayeeRepository.GetAsync(x => x.InternalPayeeId == userPayeeList.PayeeId);
        }
    }
}
