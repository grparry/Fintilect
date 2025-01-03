using ConnectBillPay.Core.Contexts;
using Moq;
using NUnit.Framework;

namespace Tests.ConnectBillPay.Services
{
    public class StatusServiceTests
    {
        //private Version _testVersion = new Version(1, 1, 1);
        //private StatusService _statusService;

        [SetUp]
        public void Setup()
        {
            var mockContext = new Mock<ConnectBillPayCuContext>();
            /* unable to mock context.Database
            mockContext.Setup(x => x.Database.CanConnectAsync(It.IsAny<CancellationToken>()))
                .Returns(async (CancellationToken token) =>
                {
                    return true;
                });
            */

            //_statusService = new StatusService(mockContext.Object, _testVersion);
        }

        /* unable to mock context.Database
        [Test]
        public async Task GetStatus_OperationTest()
        {
            // arrage

            // act
            var serviceResponse = await _statusService.GetStatus();

            // assert
            Assert.That(!string.IsNullOrEmpty(serviceResponse));
            Assert.That(!string.IsNullOrEmpty(serviceResponse.Object));
            Assert.Equals(StatusCodes.Status200OK, serviceResponse.StatusCode);
            Assert.Equals(_testVersion, serviceResponse.Object.Version);
        }
        */
    }
}
