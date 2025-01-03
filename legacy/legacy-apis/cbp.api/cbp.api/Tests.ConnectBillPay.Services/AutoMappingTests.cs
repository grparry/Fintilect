using AutoMapper;
using Moq;
using NUnit;
using NUnit.Framework;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Responses;

namespace Tests.ConnectBillPay.Services
{
    class AutoMappingTests
    {
        [Test]
        public void PayeeMappingTest()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<PersonalPayee, PayeeResponse>()
                    .ForMember(x => x.PayeeType,opt => opt.Ignore());
                cfg.CreateMap<GlobalPayee, PayeeResponse>()
                    .ForMember(dest => dest.PayeeId, opt => opt.MapFrom(src => src.InternalPayeeId))
                    .ForMember(x => x.PayeeType, opt => opt.Ignore());
            });

            configuration.AssertConfigurationIsValid();

        }
    }
}
