using AutoMapper;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Implementation;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Providers.Model;

namespace Tests.ConnectBillPay.Services
{
    public class CalendarServiceTests
    {

        private Mock<IWarehouseGenericRepository<Holiday>> _holidayRepositoryMock;
        private List<Holiday> _holidayList;

        private Mock<ICuGenericRepository<InstitutionInfo>> _institutionInfoRepositoryMock;

        private CalendarService _calendarService;
        private Mock<ICalendarProvider> _calendarProviderMock;

        [SetUp]
        public void Setup()
        {
            TestRepos.SetupHolidays(out _holidayRepositoryMock, out _holidayList);
            TestRepos.SetupInstitutionInfo(out _institutionInfoRepositoryMock, out _);

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping()); //your automapperprofile 
            });
            var mapper = mockMapper.CreateMapper();

            var settings = new ConnectBillPaySettings(new List<Configuration>()
            {
                new Configuration
                {
                    ConfigName = "ProcessDays",
                    ConfigValue = "Monday,Tuesday,Wednesday,Thursday,Friday"
                },
                new Configuration
                {
                    ConfigName = "BPPostingTime",
                    ConfigValue = "9:00, 14:00, 22:00"
                }
            });

            _calendarProviderMock = new Mock<ICalendarProvider>();
            _calendarProviderMock.Setup(x => x.GetDeliveryDates(It.IsAny<DateTime>()))
                .Returns(async (DateTime x) => new DeliveryDatesResponse { CheckDeliveryDate = DateTime.Parse("2/4/2022"), ElectronicDeliveryDate = DateTime.Parse("1/31/2022")});

            _calendarService = new CalendarService(_holidayRepositoryMock.Object,
                _institutionInfoRepositoryMock.Object,
                mapper,
                settings,
                _calendarProviderMock.Object);
        }

        [Test]
        public async Task GetIsHoliday_OperationTest_True()
        {
            // arrange
            var date = DateTime.Parse("05/20/2021");

            // act
            var serviceResponse = await _calendarService.GetIsHoliday(date);
            var response = serviceResponse.Object;

            // assert
            Assert.That(200 == serviceResponse.StatusCode);
            _holidayRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Expression<Func<Holiday, bool>>>()), Times.Once);

            Assert.That(true == response.IsHoliday);
        }

        [Test]
        public async Task GetIsHoliday_OperationTest_False()
        {
            // arrange
            var date = DateTime.Parse("05/21/2021");

            // act
            var serviceResponse = await _calendarService.GetIsHoliday(date);
            var response = serviceResponse.Object;

            // assert
            Assert.That(200 == serviceResponse.StatusCode);
            _holidayRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Expression<Func<Holiday, bool>>>()), Times.Once);

            Assert.That(false == response.IsHoliday);
        }

        [Test]
        public async Task GetNonProcessingDates_ProcessDays()
        {
            // arrange
            var fromDate = DateTime.Parse("10/13/2021");
            var someExpectedDates = new List<DateTime>
            {
                DateTime.Parse("10/16/2021"),
                DateTime.Parse("10/17/2021"),
                DateTime.Parse("11/20/2021"),
                DateTime.Parse("11/27/2021")
            };

            // act
            var nonProcessingDates = await _calendarService.GetNonProcessingDates(fromDate);

            // assert
            foreach (var expected in someExpectedDates)
            {
                Assert.That(nonProcessingDates.Object.Dates.Contains(expected));
            }
        }

        [Test]
        public async Task GetNonProcessingDates_Holidays()
        {
            // arrange
            var fromDate = DateTime.Parse("10/13/2021");
            var someExpectedDates = new List<DateTime>
            {
                DateTime.Parse("12/24/2021")
            };

            // act
            var nonProcessingDates = await _calendarService.GetNonProcessingDates(fromDate);

            // assert
            foreach (var expected in someExpectedDates)
            {
                Assert.That(nonProcessingDates.Object.Dates.Contains(expected));
            }
        }
    }
}
