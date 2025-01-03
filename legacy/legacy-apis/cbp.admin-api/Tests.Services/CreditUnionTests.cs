using AutoMapper;
using ConnectBillPay.Core.Models;
using Microsoft.Extensions.Logging.Abstractions;
using NUnit.Framework;
using Requests;
using Responses;
using Services.Implementation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tests.Services
{
    public class CreditUnionTests
    {
        private List<CreditUnion> _creditUnionList;
        private CreditUnionService _creditUnionService;
 
        [SetUp]
        public void Setup()
        {
            var logger = new NullLogger<ExceptionService>();

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping());
            });
            var mapper = mockMapper.CreateMapper();

            TestRepos.SetupCreditUnions(out var creditUnionRepoMock, out _creditUnionList);

            _creditUnionService = new CreditUnionService(creditUnionRepoMock.Object, mapper, logger);
        }

        [Test]
        public async Task CreditUnionAddAsync_OperationTest()
        {
            // arrange
            var request = new CreditUnionAddRequest
            {
                SponsorId = "9876123",
                SponsorName = "Test Credit Union 3",
                RoutingId = "123654",
                Url = "https://localhost:5001"
            };

            var count = _creditUnionList.Count();

            // act
            var response = await _creditUnionService.AddAsync(request);

            // assert
            var expectedCount = _creditUnionList.Count();
            Assert.That(201 == response.StatusCode);
            Assert.That(expectedCount == count+1);
        }

        [Test]
        public async Task CreditUnionEditAsync_OperationTest()
        {
            // arrange
            var sponsorId = "1234567";
            var sponsorName = "Test Credit Union 2";
            var request = new CreditUnionEditRequest
            {
                SponsorId = sponsorId,
                SponsorName = sponsorName
            };


            // act
            var response = await _creditUnionService.EditAsync(request);

            // assert
            var creditUnion = _creditUnionList.Find(x=>x.SponsorId == sponsorId);
            Assert.That(200 == response.StatusCode);
            Assert.That(creditUnion.SponsorName == sponsorName);
        }

        [Test]
        public async Task CreditUnionDeleteAsync_OperationTest()
        {
            // Arrange
            var sponsorId = "1234567";

            // act
            var response = await _creditUnionService.DeleteAsync(sponsorId);

            // assert
            var creditUnion = _creditUnionList.Find(x => x.SponsorId == sponsorId);
            Assert.That(200 == response.StatusCode);
            Assert.That(true == creditUnion.Deleted);
        }
    }
}