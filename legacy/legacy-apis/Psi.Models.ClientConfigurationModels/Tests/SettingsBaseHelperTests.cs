using System;
using System.Collections.Generic;
using Moq;
using NUnit.Framework;
using Psi.Data.Models.ClientConfigurationModels;
using Psi.Data.Models.Domain.ApplicationConfigurationSettings;

namespace Tests
{
	/// <summary>
	/// Not integration tests; these tests just test that the settings provider is able to deserialize json.
	/// </summary>
	[TestFixture]
	public class SettingsBaseHelperTests
	{
		[Test]
		public void SettingsBaseHelper_GetJsonValueOrNull_should_return_successfully_if_serialization_succeeds()
		{
			var settingsMock = new Mock<ISettingsBase>();
			settingsMock.Setup(x => x.ClientConfigurations).Returns(new List<ClientConfigurationSetting>()
			{
				new ClientConfigurationSetting()
				{
					Key = "MyTestSetting",
					Value = "{ thisIsMyValue:'TestValueThatShouldBeDeserialized' }"
				}
			});
			

			var classUnderTest = new TestSettingsHelper(settingsMock.Object);

			Assert.That(classUnderTest.CotsSettings, Is.Not.Null);
			Assert.That(classUnderTest.CotsSettings.ThisIsMyValue, Is.EqualTo("TestValueThatShouldBeDeserialized"));
		}

		[Test]
		public void SettingsBaseHelper_GetJsonValueOrNull_should_return_null_if_config_value_is_null()
		{
			var settingsMock = new Mock<ISettingsBase>();
			settingsMock.Setup(x => x.ClientConfigurations).Returns(new List<ClientConfigurationSetting>()
			{
				new ClientConfigurationSetting()
				{
					Key = "MyTestSetting",
					Value = null
				}
			});


			var classUnderTest = new TestSettingsHelper(settingsMock.Object);

			Assert.That(classUnderTest.CotsSettings, Is.Null);
		}

		[Test]
		public void SettingsBaseHelper_GetJsonValueOrNull_should_return_null_if_config_value_is_empty()
		{
			var settingsMock = new Mock<ISettingsBase>();
			settingsMock.Setup(x => x.ClientConfigurations).Returns(new List<ClientConfigurationSetting>()
			{
				new ClientConfigurationSetting()
				{
					Key = "MyTestSetting",
					Value = String.Empty
				}
			});


			var classUnderTest = new TestSettingsHelper(settingsMock.Object);

			Assert.That(classUnderTest.CotsSettings, Is.Null);
		}

		[Test]
		public void SettingsBaseHelper_GetJsonValueOrNull_should_return_null_if_deserialization_fails()
		{
			var settingsMock = new Mock<ISettingsBase>();
			settingsMock.Setup(x => x.ClientConfigurations).Returns(new List<ClientConfigurationSetting>()
			{
				new ClientConfigurationSetting()
				{
					Key = "MyTestSetting",
					Value = "{ This just isn't json.  We can't deserialize this stuff."
				}
			});


			var classUnderTest = new TestSettingsHelper(settingsMock.Object);

			Assert.That(classUnderTest.CotsSettings, Is.Null);
		}

		public class TestSettingsHelper : SettingsBaseHelper
		{
			public TestSettingsHelper(ISettingsBase settingsBase) : base(settingsBase)
			{
			}

			[SettingKey("MyTestSetting")]
			public TestSettingsModel CotsSettings
			{
				get { return GetJsonValueOrNull<TestSettingsModel>(); }
				set { SetValue(value); }
			}
		}

		public class TestSettingsModel
		{
			public string ThisIsMyValue { get; set; }
		}
	}
}