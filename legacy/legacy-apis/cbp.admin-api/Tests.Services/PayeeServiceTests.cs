using AutoMapper;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using NUnit.Framework;
using Requests;
using Responses;
using Services.Abstract;
using Services.Implementation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Services
{
    class PayeeServiceTests
    {
        private readonly IMapper _mapper;
        private IFisApiService _fisApiService;
        private PayeeService _payeeService;

        private List<GlobalPayee> _globalPayeeRepoList;
        private Mock<IWarehouseGenericRepository<GlobalPayee>> _globalPayeeRepositoryMock;

        [SetUp]
        public void Setup()
        {
            var logger = new NullLogger<PayeeService>();

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping());
            });
            var mapper = mockMapper.CreateMapper();

            TestRepos.SetupGlobalPayees(out _globalPayeeRepositoryMock, out _globalPayeeRepoList);

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

            _payeeService = new PayeeService(_globalPayeeRepositoryMock.Object, _mapper, _fisApiService);
        }

        [Test]
        public async Task SearchAsync_SingleSponsorId()
        {
            var expectedPayeeId = "12435687";
            // arrange
            var request = new GetPayeeRequest
            {
                PostalCode = "84602",
                State = "Utah",
                City = "Testopolis",
                Address1 = "6543 Invalid Ave",
                Name = "Test Inc",
                UsersAccountAtPayee = "1234567"
            };

            // act
            var response = await _payeeService.GetPayeeFromFisAsync(request);

            // assert

            Assert.That(201 == response.StatusCode);
            Assert.That(expectedPayeeId == response.Object.PayeeId);
        }
    }
}
