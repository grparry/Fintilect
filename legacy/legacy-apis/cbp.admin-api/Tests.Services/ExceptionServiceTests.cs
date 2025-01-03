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
    public class Tests
    {
        private ExceptionService _exceptionService;
        private List<PaymentException> _paymentExceptionList;

        [SetUp]
        public void Setup()
        {
            var logger = new NullLogger<ExceptionService>();

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping());
            });
            var mapper = mockMapper.CreateMapper();

            TestRepos.SetupCreditUnions(out var creditUnionRepoMock, out var creditUnionList);
            TestRepos.SetupFisExceptionsCorrections(out var fisExceptionsCorrectionRepoMock, out var fisExceptionsCorrectionList);
            TestRepos.SetupPaymentExceptions(out var paymentExceptionRepoMock, out _paymentExceptionList);

            _exceptionService = new ExceptionService(paymentExceptionRepoMock.Object,
                mapper,
                fisExceptionsCorrectionRepoMock.Object,
                creditUnionRepoMock.Object,
                logger);
        }

        [Test]
        public async Task SearchAsync_SingleDate()
        {
            // arrange
            var request = new ExceptionSearchRequest
            {
                Date = DateTime.Parse("12/20/2021")
            };

            // act
            var response = await _exceptionService.SearchAsync(request);

            // assert
            var expectedCount = _paymentExceptionList.Where(x => x.Created.Date == request.Date).Count();
            Assert.That(200 == response.StatusCode);
            Assert.That(expectedCount == response.Object.Exceptions.Count);
        }

        [Test]
        public async Task SearchAsync_DateRange()
        {
            // arrange
            var request = new ExceptionSearchRequest
            {
                Date = DateTime.Parse("12/20/2021"),
                EndDate = DateTime.Parse("12/28/2021")
            };

            // act
            var response = await _exceptionService.SearchAsync(request);

            // assert
            var expectedCount = _paymentExceptionList.Where(x => x.Created.Date >= request.Date && x.Created.Date <= request.EndDate).Count();
            Assert.That(200 == response.StatusCode);
            Assert.That(expectedCount == response.Object.Exceptions.Count);
        }

        [Test]
        public async Task SearchAsync_SingleSponsorId()
        {
            // arrange
            var request = new ExceptionSearchRequest
            {
                SponsorIds = new List<string>
                {
                    "1234567"
                }
            };

            // act
            var response = await _exceptionService.SearchAsync(request);

            // assert
            var expectedCount = _paymentExceptionList.Where(x => request.SponsorIds.Contains(x.SponsorId)).Count();
            Assert.That(200 == response.StatusCode);
            Assert.That(expectedCount == response.Object.Exceptions.Count);
        }

        [Test]
        public async Task SearchAsync_MultipleSponsorId()
        {
            // arrange
            var request = new ExceptionSearchRequest
            {
                SponsorIds = new List<string>
                {
                    "1234567",
                    "1111111"
                }
            };

            // act
            var response = await _exceptionService.SearchAsync(request);

            // assert
            var expectedCount = _paymentExceptionList.Where(x => request.SponsorIds.Contains(x.SponsorId)).Count();
            Assert.That(200 == response.StatusCode);
            Assert.That(expectedCount == response.Object.Exceptions.Count);
        }
    }
}