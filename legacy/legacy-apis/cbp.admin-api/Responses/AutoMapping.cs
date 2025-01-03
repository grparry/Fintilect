using AutoMapper;
using ConnectBillPay.Core.Models;
using Requests;

namespace Responses
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<BadRecord, BadRecordResponse>();

            CreateMap<CreditUnion, CreditUnionResponse>();
            CreateMap<CreditUnionAddRequest, CreditUnion>();
            CreateMap<CreditUnionEditRequest, CreditUnion>();

            CreateMap<FisExceptionsCorrection, ExceptionResponse>();

            CreateMap<GlobalPayee, GlobalPayeeResponse>()
                .ForMember(dest => dest.OfacStatus, opt => opt.MapFrom(src => src.Ofacstatus));

            CreateMap<PaymentException, ExceptionResponse>();

            CreateMap<SupportNotification, SupportNotificationResponse>();
            CreateMap<SupportNotificationCreateRequest, SupportNotification>();
            CreateMap<SupportNotificationUpdateRequest, SupportNotification>();
        }
    }
}
