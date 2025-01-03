using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Requests;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Assert = NUnit.Framework.Assert;
using ConnectBillPay.Services.Implementation;
using AutoMapper;
using ConnectBillPay.Responses;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Providers.Abstract;
using ConnectBillPay.Core.Providers.Model;
using ConnectBillPay.Core.Contexts;

namespace Tests.ConnectBillPay.Services
{
    public class PaymentServiceTests
    {
        private List<UserPayeeList> _userPayeeRepoList;
        private Mock<ICuGenericRepository<UserPayeeList>> _userPayeeListRepositoryMock;

        private List<PersonalPayee> _personalPayeeRepoList;
        private Mock<ICuGenericRepository<PersonalPayee>> _personalPayeeRepositoryMock;

        private List<Payment> _paymentRepoList;
        private Mock<ICuGenericRepository<Payment>> _paymentRepositoryMock;

        private List<RecurringPayment> _recurringPaymentRepoList;
        private Mock<ICuGenericRepository<RecurringPayment>> _recurringPaymentRepositoryMock;

        private List<PaymentHistory> _paymentHistoryRepoList;
        private Mock<ICuGenericRepository<PaymentHistory>> _paymentHistoryRepositoryMock;

        private List<PaymentChangeHistory> _paymentChangeHistoryRepoList;
        private Mock<ICuGenericRepository<PaymentChangeHistory>> _paymentChangeHistoryRepositoryMock;

        private List<StatusCode> _statusCodeRepoList;
        private Mock<ICuGenericRepository<StatusCode>> _statusCodeRepositoryMock;

        private List<RecurringPaymentChangeHistory> _recurringPaymentChangeHistoryRepoList;
        private Mock<ICuGenericRepository<RecurringPaymentChangeHistory>> _recurringPaymentChangeHistoryRepositoryMock;

        private List<CustomerInfo> _customerInfoRepoList;
        private Mock<ICuGenericRepository<CustomerInfo>> _customerInfoRepositoryMock;

        private Mock<INotificationProvider> _notificationProviderMock;

        private List<Frequency> _frequencyRepoList;
        private Mock<ICuGenericRepository<Frequency>> _frequencyRepositoryMock;

        private PaymentService _paymentService;

        [SetUp]
        public void Setup()
        {
            TestRepos.SetupUserPayeeList(out _userPayeeListRepositoryMock, out _userPayeeRepoList);
            TestRepos.SetupPersonalPayee(out _personalPayeeRepositoryMock, out _personalPayeeRepoList);
            TestRepos.SetupPayment(out _paymentRepositoryMock, out _paymentRepoList);
            TestRepos.SetupRecurringPayment(out _recurringPaymentRepositoryMock, out _recurringPaymentRepoList);
            TestRepos.SetupPaymentHistory(out _paymentHistoryRepositoryMock, out _paymentHistoryRepoList);
            TestRepos.SetupPaymentChangeHistory(out _paymentChangeHistoryRepositoryMock, out _paymentChangeHistoryRepoList);
            TestRepos.SetupRecurringPaymentChangeHistory(out _recurringPaymentChangeHistoryRepositoryMock, out _recurringPaymentChangeHistoryRepoList);
            TestRepos.SetupStatusCodes(out _statusCodeRepositoryMock, out _statusCodeRepoList);
            TestRepos.SetupCustomerInfo(out _customerInfoRepositoryMock, out _customerInfoRepoList);
            TestRepos.SetupCustomerInfo(out _customerInfoRepositoryMock, out _customerInfoRepoList);
            TestRepos.SetupHolidays(out var holidaysRepositoryMock, out var holidaysList);
            TestRepos.SetupInstitutionInfo(out var institutionInfoRepositoryMock, out var institutionInfoList);
            TestRepos.SetupFrequencyList(out _frequencyRepositoryMock, out _frequencyRepoList);

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping()); //your automapperprofile 
            });
            var mapper = mockMapper.CreateMapper();

            var globalPayeeRepositoryMock = new Mock<IWarehouseGenericRepository<GlobalPayee>>();
            var payeeLastPaymentRepository = new Mock<ICuGenericRepository<PayeeLastPayment>>();

            var unitOfWorkMock = new Mock<IUnitOfWork>();
            unitOfWorkMock.Setup(x => x.Repo<UserPayeeList>())
                .Returns(() => _userPayeeListRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<PersonalPayee>())
                .Returns(() => _personalPayeeRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<Payment>())
                .Returns(() => _paymentRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<PaymentHistory>())
                .Returns(() => _paymentHistoryRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<PaymentChangeHistory>())
                .Returns(() => _paymentChangeHistoryRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<RecurringPayment>())
                .Returns(() => _recurringPaymentRepositoryMock.Object);
            unitOfWorkMock.Setup(x => x.Repo<RecurringPaymentChangeHistory>())
                .Returns(() => _recurringPaymentChangeHistoryRepositoryMock.Object);

            var cbpSettings = new ConnectBillPaySettings(new Configuration[] 
            {
                new Configuration
                {
                    ConfigName = "LargePaymentNotification",
                    ConfigValue = "500000"
                },
                new Configuration
                {
                    ConfigName = "ProcessDays",
                    ConfigValue = "Monday,Tuesday,Wednesday,Thursday,Friday"
                }
            });

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            var memberProviderMock = new Mock<IMemberProvider>();
            memberProviderMock.Setup(x => x.GetMember(It.IsAny<string>()))
                .Returns(async (string memberId) =>
                {
                    var customer = _customerInfoRepoList.FirstOrDefault(x => x.MemberId == memberId);
                    if (customer == null)
                    {
                        return new CbpMemberResponse
                        {
                            Success = false
                        };
                    }

                    return new CbpMemberResponse
                    {
                        Member = new BillPayMember
                        {
                            FirstName = customer.First,
                            MiddleInitial = customer.Middle,
                            LastName = customer.Last,
                            AddressLine1 = customer.Address1,
                            AddressLine2 = customer.Address2,
                            City = customer.City,
                            EmailAddress = customer.Email,
                            PrimaryPhoneNumber = customer.HomePhone,
                            State = customer.State,
                            ZipCode = customer.ZipCode
                        },
                        Success = true
                    };
                });

            _notificationProviderMock = new Mock<INotificationProvider>();
            _notificationProviderMock.Setup(x => x.SendNotification(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<object[]>()));

            var calendarProviderMock = new Mock<ICalendarProvider>();
            calendarProviderMock.Setup(x => x.GetDeliveryDates(It.IsAny<DateTime>()))
                .Returns(async (DateTime x) => new DeliveryDatesResponse { CheckDeliveryDate = DateTime.Parse("2/4/2022"), ElectronicDeliveryDate = DateTime.Parse("1/31/2022") });
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously

            _paymentService = new PaymentService(_paymentRepositoryMock.Object,
                                                 _userPayeeListRepositoryMock.Object,
                                                 payeeLastPaymentRepository.Object,
                                                 globalPayeeRepositoryMock.Object,
                                                 _recurringPaymentRepositoryMock.Object,
                                                 unitOfWorkMock.Object,
                                                 mapper,
                                                 cbpSettings,
                                                 memberProviderMock.Object,
                                                 _customerInfoRepositoryMock.Object,
                                                 _notificationProviderMock.Object,
                                                 institutionInfoRepositoryMock.Object,
                                                 holidaysRepositoryMock.Object,
                                                 calendarProviderMock.Object,
                                                 _frequencyRepositoryMock.Object);
        }

        [Test]
        public async Task AddOneTimePayment_OperationTest()
        {
            // arrange
            var paymentsCount = _paymentRepoList.Count;
            var request = new OneTimePaymentAddRequest
            {
                UserPayeeListId = "TST0000000001",
                MemberId = "4321",
                FundingAccount = "1234",
                Amount = 1234,
                Memo = "Test Payment",
                SourceApplication = "Unit Test",
                WillProcessDate = DateTime.Now,
                DeliveryDate = DateTime.Now
            };

            // act
            await _paymentService.AddOneTimePayment(request);

            // assert
            _paymentRepositoryMock.Verify(x => x.Add(It.IsAny<Payment>()), Times.Once);

            Assert.That(paymentsCount + 1 == _paymentRepoList.Count);
            Assert.That(request.MemberId == _paymentRepoList.Last().MemberId);
        }

        [Test]
        public async Task AddRecurringPayment_OperationTest()
        {
            // arrange
            var paymentsCount = _paymentRepoList.Count;
            var recurringPaymentsCount = _recurringPaymentRepoList.Count;
            var request = new RecurringPaymentAddRequest
            {
                UserPayeeListId = "TST0000000001",
                MemberId = "4321",
                FundingAccount = "1234",
                Amount = 1234,
                Memo = "Test Payment",
                SourceApplication = "Unit Test",
                WillProcessDate = DateTime.Now,
                DeliveryDate = DateTime.Now,
                NumPayments = 4,
                Frequency = 3,
                ProcessDate = ""
            };

            // act
            await _paymentService.AddRecurringPayment(request);

            // assert
            _recurringPaymentRepositoryMock.Verify(x => x.Add(It.IsAny<RecurringPayment>()), Times.Once);

            Assert.That(paymentsCount + 1 == _paymentRepoList.Count);
            Assert.That(request.MemberId == _paymentRepoList.Last().MemberId);
            Assert.That(recurringPaymentsCount + 1 == _recurringPaymentRepoList.Count);
            Assert.That(request.NumPayments == _recurringPaymentRepoList.Last().NumPayments);
        }

        [Test]
        public async Task GetMemberPayments_OperationTest()
        {
            // arrange
            var memberId = "4321";

            // act
            var serviceResponse = await _paymentService.GetPendingPayments(memberId);
            var list = serviceResponse.Object;

            // assert
            Assert.That(200 == serviceResponse.StatusCode);
            Assert.That(list != null);
        }

        [Test]
        public async Task EditPayment_OperationTest()
        {
            // arrange
            var id = "TSTC0000000001"; // new Guid("DE480815-5678-4282-AAE8-7DCC415AB481");
            var request = new PaymentEditRequest
            {
                Account = "987654",
                Amount = 10000,
                MemberId = "1234",
                Suspended = true,
                WillProcessDate = new DateTime(2021, 05, 17)
            };

            // act
            await _paymentService.EditPayment(id, request);
            var mockPayment = await _paymentRepositoryMock.Object.GetAsync(x => x.Id == id);

            // assert
            Assert.That("987654" == mockPayment.FundingAccount);
        }

        [Test]
        public async Task DeleteOneTimePayment_OperationTest()
        {
            // arrange
            var memberId = "1234";
            var paymentId = "TSTC0000000001"; // new Guid("DE480815 -5678-4282-AAE8-7DCC415AB481");

            // act
            await _paymentService.DeleteOneTimePayment(memberId, paymentId);
            var mockPayment = _paymentRepoList.First(x => x.Id == paymentId);

            // assert
            Assert.That(103 == mockPayment.StatusCode);
        }

        [Test]
        public async Task DeleteRecurringPayment_OperationTest()
        {
            // arrange
            var memberId = "1234";
            var paymentId = "TSTC0000000002"; // new Guid("20716159 -f25a-4418-847c-1a5d0867d559");

            // act
            await _paymentService.DeleteRecurringPayment(memberId, paymentId);
            var mockPayment = _paymentRepoList.First(x => x.Id == paymentId);
            var mockRecurringPayment = _recurringPaymentRepoList.First(x => x.Id == mockPayment.RecurringPaymentId);

            // assert
            Assert.That(103 == mockPayment.StatusCode);

        }
        
        [Test]
        public async Task LargePaymentNotification_DontSendTest()
        {
            // arrange
            var request = new RecurringPaymentAddRequest
            {
                UserPayeeListId = "TST0000000001",
                MemberId = "1234567",
                FundingAccount = "1234567-S01",
                Amount = 500,
                Memo = "Test Payment",
                SourceApplication = "Unit Test",
                WillProcessDate = DateTime.Now,
                DeliveryDate = DateTime.Now,
                NumPayments = 4,
                Frequency = 3,
                ProcessDate = ""
            };

            // act
            await _paymentService.AddRecurringPayment(request);

            // assert
            _notificationProviderMock.Verify(x => x.SendNotification(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<object[]>()), Times.Never);
        }
    }
}
