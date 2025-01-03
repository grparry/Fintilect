using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Requests;

namespace ConnectBillPay.Responses
{
    public class AutoMapping:Profile
    {

        public AutoMapping()
        {
            CreateMap<BadRecord, BadRecordResponse>();

            CreateMap<Configuration, ConfigurationResponse>();

            CreateMap<ConfigurationAddRequest, Configuration>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.LastChangeDate, opt => opt.Ignore());

            CreateMap<ConfigurationUpdateRequest, Configuration>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.LastChangeDate, opt => opt.Ignore());

            CreateMap<GlobalPayee, PayeeResponse>()
                .ForMember(dest => dest.PayeeId, opt => opt.MapFrom(src => src.InternalPayeeId))
                .ForMember(x => x.PayeeType, opt => opt.Ignore());

            CreateMap<GlobalPayee, GlobalPayeeResponse>()
                .ForMember(dest => dest.OfacStatus, opt => opt.MapFrom(src => src.Ofacstatus));

            CreateMap<Payee, PayeeResponse>();

            CreateMap<PersonalPayee, PayeeResponse>()
                .ForMember(x => x.PayeeType, opt => opt.Ignore());

            CreateMap<Payment, PaymentChangeHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.PaymentId, opt => opt.MapFrom(src => src.Id));

            CreateMap<Payment, PaymentHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.PaymentId, opt => opt.MapFrom(src => src.Id));

            CreateMap<PaymentHistoryReport, PaymentHistoryResponse>();

            CreateMap<PaymentInqury, PaymentInquiryResponse>();

            CreateMap<PendingPayment, PendingPaymentResponse>();

            CreateMap<PersonalPayee, PersonalPayee>()
                .ForMember(x => x.Id, opt => opt.Ignore());
            CreateMap<PersonalPayee, PersonalPayeeChangeHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore());

            CreateMap<RecurringPayment, RecurringPaymentChangeHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.RecPaymentId, opt => opt.MapFrom(src => src.Id));

            CreateMap<RecurringPaymentChangeHistoryReport, RecurringPaymentChangeHistoryResponse>();

            CreateMap<SavedNotification, SavedNotificationResponse>();

            CreateMap<ScheduledPaymentChangeHistory, ScheduledPaymentChangeHistoryResponse>();

            CreateMap<UserPayeeData, UserPayeeResponse>()
                .ForMember(x => x.Payee, opt => opt.Ignore());

            CreateMap<UserPayeeList, UserPayeeListChangeHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.UserPayeeListId, opt => opt.MapFrom(src => src.Id));

            CreateMap<UserPayeeList, PaymentHistory>()
                .ForMember(x => x.Id, opt => opt.Ignore());

            CreateMap<UserPayeeListChangeHistoryReport, UserPayeeChangeHistoryResponse>();
        }
    }
}
