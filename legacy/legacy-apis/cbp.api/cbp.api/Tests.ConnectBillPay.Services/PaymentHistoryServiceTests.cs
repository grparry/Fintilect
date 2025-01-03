using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Implementation;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Tests.ConnectBillPay.Services
{
    public class PaymentHistoryServiceTests
    {

        private List<UserPayeeList> _userPayeeRepoList;
        private Mock<ICuGenericRepository<UserPayeeList>> _userPayeeListRepositoryMock;

        private List<PersonalPayee> _personalPayeeRepoList;
        private Mock<ICuGenericRepository<PersonalPayee>> _personalPayeeRepositoryMock;
        
        private List<PaymentHistory> _paymentHistoryRepoList;
        private Mock<ICuGenericRepository<PaymentHistory>> _paymentHistoryRepositoryMock;

        private List<StatusCode> _statusCodeRepoList;
        private Mock<ICuGenericRepository<StatusCode>> _statusCodeRepositoryMock;

        private List<PaymentClear> _paymentClearRepoList;
        private Mock<ICuGenericRepository<PaymentClear>> _paymentClearRepositoryMock;

        private PaymentHistoryService _paymentHistoryService;

        [SetUp]
        public void Setup()
        {
            TestRepos.SetupUserPayeeList(out _userPayeeListRepositoryMock, out _userPayeeRepoList);
            TestRepos.SetupPersonalPayee(out _personalPayeeRepositoryMock, out _personalPayeeRepoList);
            TestRepos.SetupPaymentHistory(out _paymentHistoryRepositoryMock, out _paymentHistoryRepoList);
            TestRepos.SetupStatusCodes(out _statusCodeRepositoryMock, out _statusCodeRepoList);
            TestRepos.SetupPaymentClear(out _paymentClearRepositoryMock, out _paymentClearRepoList);

            var globalPayeeRepositoryMock = new Mock<IWarehouseGenericRepository<GlobalPayee>>();
            var errorHistoryRepositoryMock = new Mock<ICuGenericRepository<ErrorHistory>>();

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping()); //your automapperprofile 
            });
            var mapper = mockMapper.CreateMapper();

            _paymentHistoryService = new PaymentHistoryService(_paymentHistoryRepositoryMock.Object,
                                                               _statusCodeRepositoryMock.Object,
                                                               _userPayeeListRepositoryMock.Object,
                                                               _personalPayeeRepositoryMock.Object,
                                                               globalPayeeRepositoryMock.Object,
                                                               _paymentClearRepositoryMock.Object,
                                                               errorHistoryRepositoryMock.Object,
                                                                mapper);
        }

        [Test]
        public async Task GetPayeeHistory_OperationTest()
        {
            // arrange
            var memberId = "4321";
            var userPayeeListId = "TSTC0000000001"; // new Guid("EE86E961 -504C-465A-BA44-C776D93698D6");

            // act
            var serviceResponse = await _paymentHistoryService.GetPayeeHistory(memberId, userPayeeListId);
            var list = serviceResponse.Object;

            // assert
            Assert.That(200 == serviceResponse.StatusCode);
            Assert.That(list != null);
        }

        [Test]
        public async Task GetPayment_OperationTest()
        {
            // arrange
            var memberId = "4321";
            var paymentId = "TSTC0000000001"; // new Guid("DE480815 -5678-4282-AAE8-7DCC415AB481");

            // act
            var serviceResponse = await _paymentHistoryService.GetPayment(memberId, paymentId);
            var response = serviceResponse.Object;

            // assert
            Assert.That(200 == serviceResponse.StatusCode);
            Assert.That(response != null);
            Assert.That(paymentId == response.PaymentId);
        }

        [Test]
        public async Task GetHistoryFromDate_OperationTest()
        {
            // arrange
            var memberId = "4321";
            var searchDate = DateTime.Parse("05/21/2021");

            // act
            var serviceResponse = await _paymentHistoryService.GetHistoryFromDate(memberId, searchDate);
            var list = serviceResponse.Object;

            // assert
            Assert.That(200 == serviceResponse.StatusCode);
            Assert.That(list != null);
            Assert.That(list.Count > 0);
        }
    }
}
