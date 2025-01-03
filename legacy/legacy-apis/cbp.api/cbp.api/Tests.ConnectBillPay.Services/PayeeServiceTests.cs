using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using ConnectBillPay.Services.Implementation;
using ConnectBillPay.Services.Abstract;
using System.Linq;
using ConnectBillPay.Core.Configuration;
using Microsoft.Extensions.Logging.Abstractions;

namespace Tests.ConnectBillPay.Services
{
    public class PayeeServiceTests
    {
        private List<UserPayeeList> _userPayeeRepoList;
        private Mock<ICuGenericRepository<UserPayeeList>> _userPayeeRepositoryMock;

        private List<PersonalPayee> _personalPayeeRepoList;
        private Mock<ICuGenericRepository<PersonalPayee>> _personalPayeeRepositoryMock;

        private List<UserPayeeListChangeHistory> _userPayeeListChangeHistoryRepoList;
        private Mock<ICuGenericRepository<UserPayeeListChangeHistory>> _userPayeeListChangeHistoryRepositoryMock;

        private List<PersonalPayeeChangeHistory> _personalPayeeChangeHistoryRepoList;
        private Mock<ICuGenericRepository<PersonalPayeeChangeHistory>> _personalPayeeChangeHistoryRepositoryMock;

        private List<Payment> _paymentRepoList;
        private Mock<ICuGenericRepository<Payment>> _paymentRepositoryMock;

        private List<PaymentHistory> _paymentHistoryRepoList;
        private Mock<ICuGenericRepository<PaymentHistory>> _paymentHistoryRepositoryMock;

        private List<GlobalPayee> _globalPayeeRepoList;
        private Mock<IWarehouseGenericRepository<GlobalPayee>> _globalPayeeRepositoryMock;

        private List<Frequency> _frequencyRepoList;
        private Mock<ICuGenericRepository<Frequency>> _frequencyRepositoryMock;

        private PayeeService _payeeService;

        private IFisApiService _fisApiService;

        [SetUp]
        public void Setup()
        {
            TestRepos.SetupUserPayeeList(out _userPayeeRepositoryMock, out _userPayeeRepoList);
            TestRepos.SetupPersonalPayee(out _personalPayeeRepositoryMock, out _personalPayeeRepoList);
            TestRepos.SetupUserPayeeListChangeHistory(out _userPayeeListChangeHistoryRepositoryMock, out _userPayeeListChangeHistoryRepoList);
            TestRepos.SetupPersonalPayeeChangeHistory(out _personalPayeeChangeHistoryRepositoryMock, out _personalPayeeChangeHistoryRepoList);
            TestRepos.SetupPayment(out _paymentRepositoryMock, out _paymentRepoList);
            TestRepos.SetupPaymentHistory(out _paymentHistoryRepositoryMock, out _paymentHistoryRepoList);
            TestRepos.SetupGlobalPayees(out _globalPayeeRepositoryMock, out _globalPayeeRepoList);
            TestRepos.SetupFrequencyList(out _frequencyRepositoryMock, out _frequencyRepoList);

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping()); //your automapperprofile 
            });
            var mapper = mockMapper.CreateMapper();

            var mockLogger = new Mock<ILogger<FisApiService>>();
            mockLogger.Setup(
                m => m.Log(
                    LogLevel.Information,
                    It.IsAny<EventId>(),
                    It.IsAny<object>(),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<object, Exception, string>>()));

            var mockLoggerFactory = new Mock<ILoggerFactory>();
            mockLoggerFactory.Setup(x => x.CreateLogger(It.IsAny<string>())).Returns(() => mockLogger.Object);

            var fisApiServiceMock = new Mock<IFisApiService>();
            fisApiServiceMock.Setup(x => x.GetPayeeByFactor(It.IsAny<GetFisPayeeByFactorRequest>()))
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
                .Returns(async (GetFisPayeeByFactorRequest request) =>
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
                {
                    var payee = _globalPayeeRepoList.FirstOrDefault(x => x.PayeeName.Equals(request.PayeeName, StringComparison.InvariantCultureIgnoreCase));
                    return new GetFisPayeeByFactorResponse
                    {
                        PayeeId = payee?.InternalPayeeId
                    };
                });
            _fisApiService = fisApiServiceMock.Object;

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            unitOfWorkMock.Setup(x => x.Repo<UserPayeeList>())
                .Returns(() => _userPayeeRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<UserPayeeListChangeHistory>())
                .Returns(() => _userPayeeListChangeHistoryRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<PersonalPayee>())
                .Returns(() => _personalPayeeRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<PersonalPayeeChangeHistory>())
                .Returns(() => _personalPayeeChangeHistoryRepositoryMock.Object);

            var settings = new ConnectBillPaySettings(new Configuration[0]);

            _payeeService = new PayeeService(
                _globalPayeeRepositoryMock.Object,
                _userPayeeRepositoryMock.Object,
                _personalPayeeRepositoryMock.Object,
                _userPayeeListChangeHistoryRepositoryMock.Object,
                _personalPayeeChangeHistoryRepositoryMock.Object,
                _paymentRepositoryMock.Object,
                mapper,
                _fisApiService,
                unitOfWorkMock.Object,
                settings,
                _paymentHistoryRepositoryMock.Object,
                new NullLogger<PayeeService>(),
                _frequencyRepositoryMock.Object);
        }

        [Test]
        public async Task AddPayeeInList_NullRequestTest()
        {
            // Arrange/Act
            var response = await _payeeService.AddPayee(null);

            // Assert
            Assert.That(200 != response.StatusCode);
        }

        [Test]
        public async Task AddPayeeInList_PayeeIdAndMemberIdNullTest()
        {
            // Arrange
            var request = new PayeeAddRequest
            {
                Active = true,
                Favorite = false,
                MemberId = null, // Null
                NameOnAccount = "NameOnAccount",
                NickName = "Nickname",
                PayeeId = null, // Null
                UsersAccountAtPayee = "UsersAccountAtPayee"
            };

            // Act
            var response = await _payeeService.AddPayee(request);

            // Assert
            Assert.That(200 != response.StatusCode);
        }

        [Test]
        public async Task AddPayeeInList_PayeeIdAndMemberIdEmptyTest()
        {
            // Arrange
            var request = new PayeeAddRequest
            {
                Active = true,
                Favorite = false,
                MemberId = string.Empty, // Empty
                NameOnAccount = "NameOnAccount",
                NickName = "Nickname",
                PayeeId = string.Empty, // Empty
                UsersAccountAtPayee = "UsersAccountAtPayee"
            };

            // Act
            var response = await _payeeService.AddPayee(request);

            // Assert
            Assert.That(200 != response.StatusCode);
        }


        [Test]
        public async Task AddPayeeInList_DoesNotHaveRequiredParametersTest()
        {
            // Arrange
            var request = new PayeeAddRequest
            {
                Active = true,
                Favorite = false,
                MemberId = "1234",
                NameOnAccount = null, // Null
                NickName = null, // Null
                PayeeId = "12345",
                UsersAccountAtPayee = null // Null
            };

            // Act
            var response = await _payeeService.AddPayee(request);

            // Assert
            Assert.That(200 != response.StatusCode);
        }

        [Test]
        public async Task AddPayeeInList_OperationTest()
        {
            // Arrange
            var request = new PayeeAddRequest
            {
                Active = true,
                Favorite = false,
                MemberId = "1234",
                NameOnAccount = "NameOnAccount",
                NickName = "Nickname",
                PayeeId = "987456",
                PostalCode = "84623",
                State = "UT",
                City = "Testopolis",
                Address1 = "123 Bad Drive",
                Name = "Test Corp",
                Phone = "8015553465",
                Country = "1",
                PayeeType = "G",
                UsersAccountAtPayee = "12345"
            };

            // Act
            var response = await _payeeService.AddPayee(request);

            // Assert
            Assert.That(201 == response.StatusCode);
        }

        [Test]
        public async Task DeletePayee_OperationTest()
        {
            // Arrange
            var memberId = "4321";
            var payeeId = "1234567";
            var userPayeeListId = "TSTC0000000002";

            // Act
            await _payeeService.DeleteUserPayee(userPayeeListId, memberId);
            var personalPayee = await _personalPayeeRepositoryMock.Object.GetAsync(x => x.PayeeId == payeeId);
            var userPayeeList = await _userPayeeRepositoryMock.Object.GetAsync(x => x.PayeeId == payeeId);

            // Assert
            Assert.That(true == personalPayee.Deleted);
            Assert.That(true == userPayeeList.Deleted);
        }

        [Test]
        public async Task EditPersonalPayee_OperationTest()
        {
            // Arrange
            var request = new PersonalPayeeEditRequest
            {
                UserPayeeListId = "TSTC0000000001",
                MemberId = "4321",
                UsersAccountAtPayee = "54321",
                NameOnAccount = "Test Payee",
                NickName = "Test",
                Active = true,
                Favorite = true,
                PhoneNumber = "5555551234",
                ZipCode = "54321", // updated zip
                State = "Utah",
                AddressLine1 = "123 Test Dr",
                AddressLine2 = "321 Example Street", // New address line
                PayeeName = "Test Payee",
                City = "Testopolis",
            };

            // Act
            var serviceResponse = await _payeeService.EditPersonalPayee(request);

            var userPayeeList = _userPayeeRepoList.FirstOrDefault(x => x.Id == request.UserPayeeListId);
            var personalPayee = _personalPayeeRepoList.FirstOrDefault(x => x.PayeeId == userPayeeList.PayeeId);

            // Assert
            Assert.That(personalPayee != null);
            Assert.That(request.ZipCode == personalPayee.ZipCode);
            Assert.That(request.AddressLine2 == personalPayee.AddressLine2);
        }

        [Test]
        public async Task EditPersonalPayee_GlobalFound_OperationTest()
        {
            // Arrange
            var request = new PersonalPayeeEditRequest
            {
                UserPayeeListId = "TSTC0000000001",
                MemberId = "4321",
                UsersAccountAtPayee = "54321",
                NameOnAccount = "Test Payee",
                NickName = "Test",
                Active = true,
                Favorite = true,
                PhoneNumber = "5555551234",
                ZipCode = "84623", // updated zip
                State = "Utah",
                AddressLine1 = "123 Bad Drive",
                PayeeName = "Test Corp",
                City = "Testopolis",
            };

            // Act
            var serviceResponse = await _payeeService.EditPersonalPayee(request);

            var userPayeeList = _userPayeeRepoList.FirstOrDefault(x => x.Id == request.UserPayeeListId);
            var globalPayee = _globalPayeeRepoList.FirstOrDefault(x => x.InternalPayeeId == userPayeeList.PayeeId);

            // Assert
            Assert.That(globalPayee != null);
            Assert.That(request.ZipCode == globalPayee?.ZipCode);
            Assert.That(request.AddressLine1 == globalPayee.AddressLine1);
            Assert.That("G" == userPayeeList.PayeeType);
            Assert.That(!string.IsNullOrEmpty(userPayeeList.FisPayeeId));
        }

        [Test]
        public async Task EditGlobalPayee_OperationTest()
        {
            var userPayeeListId = "4";
            var accountNumber = "5555555";

            var editRequest = new GlobalPayeeEditRequest
            {
                UserPayeeListId = userPayeeListId,
                PayeeId = "1234",
                AccountName = "Connect Updated Account",
                AccountNumber = accountNumber,
                Active = true,
                Favorite = true,
                Nickname = "Internet Banking",
                MemberId = "4321"
            };

            await _payeeService.EditGlobalPayee(editRequest);

            var mockPayee = await _userPayeeRepositoryMock.Object.GetAsync(x => x.Id == userPayeeListId);
            Assert.That(accountNumber == mockPayee.UsersAccountAtPayee);
        }

        [Test]
        public async Task GetGlobalPayeesByName_OperationTest()
        {
            // arrange
            var partialName = "Test";

            // act
            var serviceResponse = await _payeeService.GetGlobalPayeesByName(partialName);
            var response = serviceResponse.Object;

            // assert
            Assert.That(response != null);
            foreach (var payee in response)
                Assert.That(payee.PayeeName.StartsWith(partialName));
        }

        [Test]
        public async Task GetGlobalPayeesByZip_OperationTest()
        {
            // arrange
            var partialZip = "84";

            // act
            var serviceResponse = await _payeeService.GetGlobalPayeesByZip(partialZip);
            var response = serviceResponse.Object;

            // assert
            Assert.That(response != null);
            foreach (var payee in response)
                Assert.That(payee.ZipCode.StartsWith(partialZip));
        }

        [Test]
        public async Task GetGlobalPayeesByNameZip_OperationTest()
        {
            // arrange
            var partialName = "Test";
            var partialZip = "84";

            // act
            var serviceResponse = await _payeeService.GetGlobalPayeesByNameZip(partialName, partialZip);
            var response = serviceResponse.Object;

            // assert
            Assert.That(response != null);
            foreach (var payee in response)
                Assert.That(payee.PayeeName.StartsWith(partialName));
            foreach (var payee in response)
                Assert.That(payee.ZipCode.StartsWith(partialZip));
        }

        [Test]
        public async Task GetPersonalPayee_OperationTest()
        {
            // Arrange
            string memberId = "4321";
            string payeeId = "1234";

            // Act
            var serviceResponse = await _payeeService.GetUserPayee(memberId, payeeId);
            var personalPayee = serviceResponse.Object;

            // Assert
            Assert.That(personalPayee != null);
            Assert.That(memberId == personalPayee.MemberId);
            Assert.That(payeeId == personalPayee.Payee.PayeeId);
        }
    }
}