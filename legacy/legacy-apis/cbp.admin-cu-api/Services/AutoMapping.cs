using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using Requests.Calendar;
using Requests.Configuration;
using Requests.Contact;
using Requests.Notification;
using Responses.Calendar;
using Responses.Configuration;
using Responses.Contact;
using Responses.Exception;
using Responses.OnUs;
using Responses.Payee;
using Responses.Payment;
using Responses.StatusCode;

namespace Services
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            // calendar

            CreateMap<HolidayCreateRequest, Holiday>()
                .ForMember(x => x.Id, opt => opt.Ignore());
            CreateMap<HolidayUpdateRequest, Holiday>()
                .ForMember(x => x.Id, opt => opt.Ignore());
            CreateMap<Holiday, HolidayResponse>();

            // configuration

            CreateMap<Configuration, ConfigurationResponse>();
            CreateMap<ConfigurationCreateRequest, Configuration>();
            CreateMap<ConfigurationUpdateRequest, Configuration>();

            // contact

            CreateMap<Contact, ContactResponse>();
            CreateMap<ContactCreateRequest, Contact>();
            CreateMap<ContactUpdateRequest, Contact>();

            // exception

            CreateMap<PaymentException, PaymentExceptionResponse>();
            CreateMap<PaymentExceptionAdjustment, PaymentExceptionAdjustmentResponse>();

            // institution info

            CreateMap<InstitutionInfo, InstitutionInfoResponse>();
            CreateMap<InstitutionInfoCreateRequest, InstitutionInfo>();
            CreateMap<InstitutionInfoUpdateRequest, InstitutionInfo>();

            // notification

            CreateMap<Notification, NotificationResponse>();
            CreateMap<NotificationCreateRequest, Notification>();
            CreateMap<NotificationUpdateRequest, Notification>();
            CreateMap<SavedNotification, SavedNotificationResponse>();

            // on us

            CreateMap<FailedOnUsReport, FailedOnUsResponse>();
            CreateMap<OnUsPaymentException, OnUsPaymentExceptionResponse>();

            // status code

            CreateMap<StatusCode, StatusCodeResponse>();

            // payment

            CreateMap<ScheduledPaymentChangeHistory, ScheduledPaymentChangeHistoryResponse>();
            CreateMap<RecurringPaymentChangeHistoryReport, RecurringPaymentChangeHistoryResponse>();
            CreateMap<PendingPayment, PendingPaymentResponse>();
            CreateMap<PaymentActivity, PaymentActivityResponse>();

            CreateMap<Payment, PaymentHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.PaymentId, opt => opt.MapFrom(src => src.Id));

            CreateMap<UserPayeeList, PaymentHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore());

            // change history

            CreateMap<OnUsPaymentException, OnUsPaymentsChangeHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore());
            CreateMap<Payment, PaymentChangeHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.PaymentId, opt => opt.MapFrom(src => src.Id));
            CreateMap<UserPayeeList, UserPayeeListChangeHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.UserPayeeListId, opt => opt.MapFrom(src => src.Id));
            CreateMap<RecurringPayment, RecurringPaymentChangeHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.RecPaymentId, opt => opt.MapFrom(src => src.Id));
            CreateMap<UserPayeeListChangeHistoryReport, UserPayeeChangeHistoryResponse>();
        }
    }
}
