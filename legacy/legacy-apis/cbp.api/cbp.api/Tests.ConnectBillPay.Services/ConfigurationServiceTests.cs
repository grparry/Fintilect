using AutoMapper;
using ConnectBillPay.Core.Configuration;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Requests;
using ConnectBillPay.Responses;
using ConnectBillPay.Services.Implementation;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tests.ConnectBillPay.Services
{
    public class ConfigurationServiceTests
    {
        private List<Configuration> _configurationList;
        private Mock<ICuGenericRepository<Configuration>> _configurationRepositoryMock;

        private ConfigurationService _configurationService;

        [SetUp]
        public void Setup()
        {
            TestRepos.SetupConfiguration(out _configurationRepositoryMock, out _configurationList);

            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapping()); //your automapperprofile 
            });
            var mapper = mockMapper.CreateMapper();

            var settings = new ConnectBillPaySettings(new Configuration[0]);

            _configurationService = new ConfigurationService(_configurationRepositoryMock.Object, mapper, settings);
        }

        [Test]
        public async Task Create_SuccessTest()
        {
            // arrange
            var request = new ConfigurationAddRequest
            {
                ConfigName = "Test.Create",
                ConfigValue = "test value",
                Description = "A configuration to test creation",
                DataType = "String",
                ConnectManagerAccess = "Read",
                ConnectSupportAccess = "Read",
                CreditUnionAccess = "Read",
                LastUpdatedBy = "test"
            };

            // act
            var success = await _configurationService.Create(request);
            var config = _configurationList.FirstOrDefault(x => x.ConfigName == request.ConfigName);

            // assert
            Assert.That(success);
            Assert.That(config != null);
        }

        [Test]
        public async Task Create_DuplicateTest()
        {
            // arrange
            var request = new ConfigurationAddRequest
            {
                ConfigName = "Test.Update", // config already exists with name
                ConfigValue = "test value",
                Description = "A configuration to test creation",
                DataType = "String",
                ConnectManagerAccess = "Read",
                ConnectSupportAccess = "Read",
                CreditUnionAccess = "Read",
                LastUpdatedBy = "test"
            };

            // act
            var success = await _configurationService.Create(request);

            // assert
            Assert.That(!success);
        }

        [Test]
        public async Task Get_SuccessTest()
        {
            // arrange
            var id = new Guid("b970f711-cfcc-4d8d-ac83-44ddea530c58");

            // act
            var config = await _configurationService.Get(id);

            // assert
            Assert.That(config != null);
        }

        [Test]
        public async Task Get_NotFoundTest()
        {
            // arrange
            var id = new Guid("b970f711-0000-4d8d-ac83-44ddea530c58");

            // act
            var config = await _configurationService.Get(id);

            // assert
            Assert.That(config == null);
        }

        [Test]
        public async Task Delete_SuccessTest()
        {
            // arrange
            var id = new Guid("b970f711-cfcc-4d8d-ac83-44ddea530c58");

            // act
            var success = await _configurationService.Delete(id);
            var config = _configurationList.FirstOrDefault(x => x.Id == id);

            // assert
            Assert.That(success);
            Assert.That(config == null);
        }

        [Test]
        public async Task Delete_NotFoundTest()
        {
            // arrange
            var id = new Guid("b970f711-0000-4d8d-ac83-44ddea530c58");

            // act
            var success = await _configurationService.Delete(id);

            // assert
            Assert.That(!success);
        }

        [Test]
        public async Task Update_SuccessTest()
        {
            // arrange
            var request = new ConfigurationUpdateRequest
            {
                Id = new Guid("b970f711-cfcc-4d8d-ac83-44ddea530c58"),
                ConfigName = "Test.Update",
                ConfigValue = "Updated value",
                Description = "New description",
                DataType = "String",
                ConnectManagerAccess = "Read",
                ConnectSupportAccess = "Read",
                CreditUnionAccess = "Read",
                LastUpdatedBy = "test"
            };

            // act
            var success = await _configurationService.Update(request);
            var config = await _configurationService.Get(request.Id);

            // assert
            Assert.That(success);
            Assert.That(config != null);
            Assert.That(request.ConfigValue == config.ConfigValue);
            Assert.That(request.Description == config.Description);
        }

        [Test]
        public async Task Update_NotFoundTest()
        {
            // arrange
            var request = new ConfigurationUpdateRequest
            {
                Id = new Guid("b970f711-0000-4d8d-ac83-44ddea530c58"),
                ConfigName = "Test.Faux",
                ConfigValue = "Updated value",
                Description = "New description",
                DataType = "String",
                ConnectManagerAccess = "Read",
                ConnectSupportAccess = "Read",
                CreditUnionAccess = "Read",
                LastUpdatedBy = "test"
            };

            // act
            var success = await _configurationService.Update(request);

            // assert
            Assert.That(!success);
        }

        [Test]
        public async Task Update_LastUpdatedBy_SuccessTest()
        {
            // arrange
            var request = new ConfigurationUpdateRequest
            {
                Id = new Guid("b970f711-cfcc-4d8d-ac83-44ddea530c58"),
                ConfigName = "Test.Update",
                ConfigValue = "Updated value",
                Description = "New description",
                DataType = "String",
                ConnectManagerAccess = "Read",
                ConnectSupportAccess = "Read",
                CreditUnionAccess = "Read",
                LastUpdatedBy = "new"
            };

            // act
            var success = await _configurationService.Update(request);
            var config = await _configurationService.Get(request.Id);

            // assert
            Assert.That(success);
            Assert.That(config != null);
            Assert.That(request.LastUpdatedBy == config.LastUpdatedBy);
        }
    }
}
