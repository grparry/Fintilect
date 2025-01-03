using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Implementation;
using Microsoft.AspNetCore.Http;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Tests.ConnectBillPay.Services
{
    public class BadRecordsServiceTests
    {
        private Mock<IWarehouseGenericRepository<BadRecord>> _badRecordRepositoryMock;
        private List<BadRecord> _badRecordRepositoryList;

        private BadRecordService _badRecordService;

        [SetUp]
        public void Setup()
        {
            TestRepos.SetupBadRecords(out _badRecordRepositoryMock, out _badRecordRepositoryList);

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping()); 
            });
            var mapper = mockMapper.CreateMapper();

            _badRecordService = new BadRecordService(mapper, _badRecordRepositoryMock.Object);
        }

        [Test]
        public async Task GetBadRecordsFromDate_Date1Test()
        {
            // arrange
            var date = DateTime.Parse("6/26/2021");

            // act
            var serviceResponse = await _badRecordService.GetBadRecordsFromDate(date);

            // assert
            Assert.That(serviceResponse != null);
            Assert.That(serviceResponse?.Object != null);
            Assert.That(StatusCodes.Status200OK == serviceResponse?.StatusCode);
            Assert.That(1 == serviceResponse?.Object?.BadRecords.Count);
        }

        [Test]
        public async Task GetBadRecordsFromDate_Date2Test()
        {
            // arrange
            var date = DateTime.Parse("6/20/2021");

            // act
            var serviceResponse = await _badRecordService.GetBadRecordsFromDate(date);

            // assert
            Assert.That(serviceResponse != null);
            Assert.That(serviceResponse?.Object != null);
            Assert.That(StatusCodes.Status200OK == serviceResponse?.StatusCode);
            Assert.That(1 == serviceResponse?.Object?.BadRecords.Count);
        }
    }
}
