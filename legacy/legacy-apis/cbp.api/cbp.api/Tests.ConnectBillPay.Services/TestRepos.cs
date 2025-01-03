using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Tests.ConnectBillPay.Services
{
    public static class TestRepos
    {
        public static void SetupUserPayeeList(out Mock<ICuGenericRepository<UserPayeeList>> repo, out List<UserPayeeList> list)
        {
            list = new List<UserPayeeList>
            {
                new UserPayeeList
                {
                    Id = "TSTC0000000001", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                    PayeeId = "1234",
                    Active = true,
                    Favorite = true,
                    NameOnAccount = "Connect2",
                    NickName = "Developer Bill Pay2",
                    UsersAccountAtPayee = "123123123",
                    LastUpdated = DateTime.Now,
                    LastUpdatedBy = "7654321",
                    PayeeType = "P",
                    MemberId = "4321",
                    AttentionLine = "",
                    PaymentMethod = "",
                    Created = DateTime.Now,
                    Deleted = false
                },
                new UserPayeeList
                {
                    Id = "TSTC0000000002", // new Guid("32c37e15-f759-4d96-baa9-4e7ad65b9094"),
                    PayeeId = "1234567",
                    Active = true,
                    Favorite = true,
                    NameOnAccount = "Connect3",
                    NickName = "Developer Bill Pay3",
                    UsersAccountAtPayee = "121212121",
                    LastUpdated = DateTime.Now,
                    LastUpdatedBy = "7654321",
                    PayeeType = "P",
                    MemberId = "4321",
                    AttentionLine = "",
                    PaymentMethod = "",
                    Created = DateTime.Now,
                    Deleted = false
                },
                new UserPayeeList
                {
                    Id = "TSTC0000000003", // new Guid("32c37e15-f759-4d96-baa9-4e7ad65b9094"),
                    PayeeId = "654321",
                    Active = true,
                    Favorite = true,
                    NameOnAccount = "Connect3",
                    NickName = "Developer Bill Pay3",
                    UsersAccountAtPayee = "121212121",
                    LastUpdated = DateTime.Now,
                    LastUpdatedBy = "7654321",
                    PayeeType = "O",
                    MemberId = "4321",
                    AttentionLine = "",
                    PaymentMethod = "",
                    Created = DateTime.Now,
                    Deleted = false
                },
                new UserPayeeList
                {
                    Id = "4", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                    PayeeId = "987456",
                    FisPayeeId = "987456",
                    Active = true,
                    Favorite = true,
                    NameOnAccount = "Connect2",
                    NickName = "Developer Bill Pay2",
                    UsersAccountAtPayee = "123123123",
                    LastUpdated = DateTime.Now,
                    LastUpdatedBy = "7654321",
                    PayeeType = "G",
                    MemberId = "4321",
                    AttentionLine = "",
                    PaymentMethod = "",
                    Created = DateTime.Now,
                    Deleted = false
                },
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupFrequencyList(out Mock<ICuGenericRepository<Frequency>> repo, out List<Frequency> list)
        {
            list = new List<Frequency>
            {
                new Frequency { Description = "ONETIME", Id = -1},
                new Frequency { Description = "WEEKLY", Id = 1},
                new Frequency { Description = "BIWEEKLY", Id = 2},
                new Frequency { Description = "FOURWEEKS", Id = 3},
                new Frequency { Description = "MONTHLY", Id = 4},
                new Frequency { Description = "BIMONTHLY", Id = 5},
                new Frequency { Description = "QUARTERLY", Id = 6},
                new Frequency { Description = "SEMIANNUALLY", Id = 7},
                new Frequency { Description = "ANNUALLY", Id = 8}

            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupUserPayeeListChangeHistory(out Mock<ICuGenericRepository<UserPayeeListChangeHistory>> repo, out List<UserPayeeListChangeHistory> list)
        {
            list = new List<UserPayeeListChangeHistory>();

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupPaymentHistory(out Mock<ICuGenericRepository<PaymentHistory>> repo, out List<PaymentHistory> list)
        {
            list = new List<PaymentHistory>
            {
                new PaymentHistory
                {
                    Id = 1,
                    PaymentId = "TSTC0000000001", // new Guid("DE480815-5678-4282-AAE8-7DCC415AB481"),
                    UserPayeeListId = "TSTC0000000001", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                    PayeeType = "P",
                    MemberId= "4321",
                    FundingAccount= "123456",
                    Amount= 100,
                    CheckNum= "101",
                    WillProcessDate =new DateTime(2021, 05, 21, 0, 0, 0),
                    StatusCode = 100,
                    Memo = "Payment Processed",
                    SourceApplication = "CBP",
                    PayeeId = "1234",
                    UsersAccountAtPayee = "987654",
                    NameOnAccount = "Connect Corporate",
                    PaymentMethod = "E",
                    RunId = 0,
                    ProcessedDate = DateTime.Parse("05/21/2021")
                },
                new PaymentHistory
                {
                    Id = 2,
                    PaymentId = "TSTC0000000002", // new Guid("97C22581-864D-49D4-9DBB-AC23ED3F4CB3"),
                    UserPayeeListId = "TSTC0000000001", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                    PayeeType = "P",
                    MemberId= "4321",
                    FundingAccount= "123456",
                    Amount= 100,
                    CheckNum= "101",
                    WillProcessDate =new DateTime(2021, 05, 21, 0, 0, 0),
                    StatusCode = 100,
                    Memo= "Payment Processed",
                    SourceApplication = "CBP",
                    PayeeId = "1234",
                    UsersAccountAtPayee = "987654",
                    NameOnAccount = "Connect Corporate",
                    PaymentMethod = "E",
                    RunId = 0,
                    ProcessedDate = DateTime.Parse("05/21/2021")
                },
                new PaymentHistory
                {
                    Id = 3,
                    PaymentId = "TSTC0000000003", // new Guid("97C22581-864D-49D4-9DBB-AC23ED3F4CB3"),
                    UserPayeeListId = "TSTC0000000003", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                    PayeeType = "O",
                    MemberId= "4321",
                    FundingAccount= "123456",
                    Amount= 100,
                    CheckNum= "101",
                    WillProcessDate =new DateTime(2021, 05, 21, 0, 0, 0),
                    StatusCode = 100,
                    Memo= "Payment Processed",
                    SourceApplication = "CBP",
                    PayeeId = "654321",
                    UsersAccountAtPayee = "987654",
                    NameOnAccount = "Connect Corporate",
                    PaymentMethod = "E",
                    RunId = 0,
                    ProcessedDate = DateTime.Parse("05/21/2021")
                }
            };
            SetupRepositoryWithSource(list, out repo);

            repo.Setup(x => x.GetPaymentHistoryFromDate(It.IsAny<string>(), It.IsAny<DateTime>()))
                .Returns(async (string x, DateTime d) =>
                {
                    var historyList = new List<PaymentHistoryReport>
                    {
                        new PaymentHistoryReport
                        {
                            Id = 1,
                            PaymentId = "TSTC0000000001", // new Guid("DE480815-5678-4282-AAE8-7DCC415AB481"),
                            UserPayeeListId = "TSTC0000000001", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                            PayeeType = "P",
                            FundingAccount = "123456",
                            Amount = 100,
                            WillProcessDate = new DateTime(2021, 05, 21, 0, 0, 0),
                            StatusCode = 100,
                            Memo = "Payment Processed",
                            PayeeId = "1234",
                            UsersAccountAtPayee = "987654",
                            NameOnAccount = "Connect Corporate",
                            PaymentMethod = "E",
                            ProcessedDate = DateTime.Parse("05/21/2021")
                        },
                        new PaymentHistoryReport
                        {
                            Id = 2,
                            PaymentId = "TSTC0000000002", // new Guid("97C22581-864D-49D4-9DBB-AC23ED3F4CB3"),
                            UserPayeeListId = "TSTC0000000001", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                            PayeeType = "P",
                            FundingAccount = "123456",
                            Amount = 100,
                            WillProcessDate = new DateTime(2021, 05, 21, 0, 0, 0),
                            StatusCode = 100,
                            Memo = "Payment Processed",
                            PayeeId = "1234",
                            UsersAccountAtPayee = "987654",
                            NameOnAccount = "Connect Corporate",
                            PaymentMethod = "E",
                            ProcessedDate = DateTime.Parse("05/21/2021")
                        },
                        new PaymentHistoryReport
                        {
                            Id = 3,
                            PaymentId = "TSTC0000000003", // new Guid("97C22581-864D-49D4-9DBB-AC23ED3F4CB3"),
                            UserPayeeListId = "TSTC0000000003", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                            PayeeType = "O",
                            FundingAccount = "123456",
                            Amount = 100,
                            WillProcessDate = new DateTime(2021, 05, 21, 0, 0, 0),
                            StatusCode = 100,
                            Memo = "Payment Processed",
                            PayeeId = "654321",
                            UsersAccountAtPayee = "987654",
                            NameOnAccount = "Connect Corporate",
                            PaymentMethod = "E",
                            ProcessedDate = DateTime.Parse("05/21/2021")
                        }
                    };

                    return historyList.ToList();
                });

            repo.Setup(x => x.GetPaymentInquiry(It.IsAny<string>(), It.IsAny<string>()))
             .Returns(async (string p, string m) =>
             {
                 var inquiry = new PaymentInqury
                 {
                     PaymentId = "TSTC0000000001", // new Guid("DE480815-5678-4282-AAE8-7DCC415AB481"),
                     UserPayeeListId = "TSTC0000000001", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                     PayeeType = "P",
                     FundingAccount = "123456",
                     Amount = 100,
                     WillProcessDate = new DateTime(2021, 05, 21, 0, 0, 0),
                     StatusCode = 100,
                     Memo = "Payment Processed",
                     PayeeId = "1234",
                     UsersAccountAtPayee = "987654",
                     NameOnAccount = "Connect Corporate",
                     PaymentMethod = "E",
                     ProcessedDate = DateTime.Parse("05/21/2021")
                 };
                 return inquiry;

             });
        }


        public static void SetupPersonalPayee(out Mock<ICuGenericRepository<PersonalPayee>> repo, out List<PersonalPayee> list)
        {
            list = new List<PersonalPayee>
            {
                new PersonalPayee
                {
                    Id = 1,
                    LastUpdatedBy = "4321",
                    LastUpdated = DateTime.Now,
                    CheckLeadTime = "",
                    PhoneNumber = "5555551234",
                    CountryCode = "1",
                    ZipCode = "12345",
                    Created = DateTime.Now,
                    State = "Utah",
                    AddressLine1 = "123 Test Dr",
                    PayeeName = "Test Payee",
                    PayeeId = "1234",
                    City = "Testopolis",
                    Deleted = false
                },
                new PersonalPayee
                {
                    Id = 2,
                    LastUpdatedBy = "4321",
                    LastUpdated = DateTime.Now,
                    CheckLeadTime = "",
                    PhoneNumber = "5555554321",
                    CountryCode = "1",
                    ZipCode = "12346",
                    Created = DateTime.Now,
                    State = "Utah",
                    AddressLine1 = "123 Test Dr",
                    PayeeName = "Test Payee",
                    PayeeId = "1234567",
                    City = "Testopolis",
                    Deleted = false
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupPersonalPayeeChangeHistory(out Mock<ICuGenericRepository<PersonalPayeeChangeHistory>> repo, out List<PersonalPayeeChangeHistory> list)
        {
            list = new List<PersonalPayeeChangeHistory>();

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupPayment(out Mock<ICuGenericRepository<Payment>> repo, out List<Payment> list)
        {
            list = new List<Payment>
            {
                new Payment
                {
                    Id = "TSTC0000000001", // new Guid("DE480815-5678-4282-AAE8-7DCC415AB481"),
                    UserPayeeListId = "TSTC0000000001", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                    MemberId = "4321",
                    FundingAccount = "1234",
                    Amount = 1234,
                    Memo = "Test Payment",
                    StatusCode = 100,
                    SourceApplication = "Unit Test",
                    WillProcessDate = DateTime.Now,
                    DeliveryDate = DateTime.Now
                },
                new Payment
                {
                    Id = "TSTC0000000002", // new Guid("20716159-f25a-4418-847c-1a5d0867d559"),
                    UserPayeeListId = "TSTC0000000001", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                    RecurringPaymentId = "TSTC0000000001", // new Guid("0a356434-e723-4aea-b500-4ec84bf0e8a9"),
                    MemberId = "4321",
                    FundingAccount = "1234",
                    Amount = 1234,
                    Memo = "Test Payment Recurring",
                    StatusCode = 100,
                    SourceApplication = "Unit Test",
                    WillProcessDate = DateTime.Now,
                    DeliveryDate = DateTime.Now
                },
                new Payment
                {
                    Id = "TSTC0000000003", // new Guid("20716159-f25a-4418-847c-1a5d0867d559"),
                    UserPayeeListId = "TSTC0000000003", // new Guid("EE86E961-504C-465A-BA44-C776D93698D6"),
                    RecurringPaymentId =null, // new Guid("0a356434-e723-4aea-b500-4ec84bf0e8a9"),
                    MemberId = "4321",
                    FundingAccount = "1234",
                    Amount = 1234,
                    Memo = "Test Payment On Us",
                    StatusCode = 100,
                    SourceApplication = "Unit Test",
                    WillProcessDate = DateTime.Now,
                    DeliveryDate = DateTime.Now
                }
            };

            SetupRepositoryWithSource(list, out repo);

            repo.Setup(x => x.GetPaymentInformationAsync(It.IsAny<Expression<Func<PaymentInformationReport, bool>>>()))
                .Returns(async (Expression<Func<PaymentInformationReport, bool>> x) =>
                {
                    var informationList = new List<PaymentInformationReport>
                    {
                        new PaymentInformationReport
                        {
                            PaymentId = "TSTC0000000001",
                            MemberId = "4321",
                            Amount = 1234,
                            Status = "Pending",
                            StatusCode = 100,
                            WillProcessDate = DateTime.Parse("12/20/2021"),
                            UserPayeeListId = "TSTC0000000001",
                            PayeeType = "G",
                            PayeeName = "",
                            CheckNumber = "",
                            CheckClearedDate = null,
                            ResolutionType = "",
                            ProblemCauseType = "",
                            PaymentMethod = "Electronic",
                            FisPayeeId = "9876",
                            PayeeId = "9876"
                        },
                        new PaymentInformationReport
                        {
                            PaymentId = "TSTC0000000002",
                            MemberId = "4321",
                            Amount = 5678,
                            Status = "Paid",
                            StatusCode = 101,
                            WillProcessDate = DateTime.Parse("12/21/2021"),
                            UserPayeeListId = "TSTC0000000002",
                            PayeeType = "P",
                            PayeeName = "Testing Software Corp.",
                            CheckNumber = "",
                            CheckClearedDate = null,
                            ResolutionType = "",
                            ProblemCauseType = "",
                            PaymentMethod = "Electronic",
                            FisPayeeId = "1234567",
                            PayeeId = "1234567"
                        },
                        new PaymentInformationReport
                        {
                            PaymentId = "TSTC0000000003",
                            MemberId = "4321",
                            Amount = 9012,
                            Status = "Pending",
                            StatusCode = 1045,
                            WillProcessDate = DateTime.Parse("12/20/2021"),
                            UserPayeeListId = "TSTC0000000003",
                            PayeeType = "P",
                            PayeeName = "One More Test Corp.",
                            CheckNumber = "101",
                            CheckClearedDate = null,
                            ResolutionType = "",
                            ProblemCauseType = "Duplicate",
                            PaymentMethod = "Check",
                            FisPayeeId = "1234567",
                            PayeeId = "1234567"
                        }
                    };

                    var filter = x.Compile();
                    return informationList.Where(filter).ToList();
                });

            repo.Setup(x => x.GetPendingPaymentsAsync(It.IsAny<string>()))
                .Returns(async (string x) =>
                {
                    var informationList = new List<PendingPayment>
                    {
                        new PendingPayment
                        {
                            Id = "TSTC0000000001",
                            MemberId = "4321",
                            Amount = 1234,
                            StatusCode = 100,
                            WillProcessDate = DateTime.Parse("12/20/2021"),
                            UserPayeeListId = "TSTC0000000001",
                            PayeeType = "G",
                            PayeeName = "Tester R Us",
                            PaymentMethod = "Electronic",
                            FisPayeeId = "9876"
                        }
                    };

                    // var filter = x.Compile();
                    return informationList.ToList();
                });
        }

        public static void SetupRecurringPayment(out Mock<ICuGenericRepository<RecurringPayment>> repo, out List<RecurringPayment> list)
        {
            list = new List<RecurringPayment>()
            {
                new RecurringPayment
                {
                    Id = "TSTC0000000001", // new Guid("0a356434-e723-4aea-b500-4ec84bf0e8a9"),
                    Active = true,
                    NumPayments = 2,
                    PaymentsProcessed = 0,
                    Frequency = 5,
                    LastUpdate = DateTime.Now,
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupPaymentChangeHistory(out Mock<ICuGenericRepository<PaymentChangeHistory>> repo, out List<PaymentChangeHistory> list)
        {
            list = new List<PaymentChangeHistory>();

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupRecurringPaymentChangeHistory(out Mock<ICuGenericRepository<RecurringPaymentChangeHistory>> repo, out List<RecurringPaymentChangeHistory> list)
        {
            list = new List<RecurringPaymentChangeHistory>();

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupStatusCodes(out Mock<ICuGenericRepository<StatusCode>> repo, out List<StatusCode> list)
        {
            list = new List<StatusCode>
            {
                new StatusCode
                {
                    Code = 100,
                    Description = "Payment processing is pending",
                    FriendlyName = "Pending"
                },
                new StatusCode
                {
                    Code = 103,
                    Description = "Payment has been deleted",
                    FriendlyName = "Deleted"
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupPaymentClear(out Mock<ICuGenericRepository<PaymentClear>> repo, out List<PaymentClear> list)
        {
            list = new List<PaymentClear>
            {
                new PaymentClear
                {
                    Id = 1,
                    PaymentId = "TSTC0000000001", // new Guid("DE480815-5678-4282-AAE8-7DCC415AB481"),
                    ClearedDate = DateTime.Parse("05/23/2021")
                },
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupGlobalPayees(out Mock<IWarehouseGenericRepository<GlobalPayee>> repo, out List<GlobalPayee> list)
        {
            list = new List<GlobalPayee>
            {
                new GlobalPayee
                {
                    ZipCode = "84602",
                    State = "Utah",
                    City = "Testopolis",
                    AddressLine1 = "6543 Invalid Ave",
                    PayeeName = "Test Inc",
                    InternalPayeeId = "12435687",
                    PhoneNumber = "8015556789",
                    CountryCode = "1",
                    PayeeStatus = "ACTIVE"
                    
                },
                new GlobalPayee
                {
                    ZipCode = "84623",
                    State = "Utah",
                    City = "Testopolis",
                    AddressLine1 = "123 Bad Drive",
                    PayeeName = "Test Corp",
                    InternalPayeeId = "987456",
                    PhoneNumber = "8015553465",
                    CountryCode = "1",
                    PayeeStatus = "ACTIVE"
                }
            };

            SetupWarehouseRepositoryWithSource(list, out repo);
        }

        public static void SetupOnUsPaymentExceptions(out Mock<ICuGenericRepository<OnUsPaymentException>> repo, out List<OnUsPaymentException> list)
        {
            list = new List<OnUsPaymentException>
            {
                new OnUsPaymentException
                {
                    Id = 1,
                    PaymentId = "TSTC0000000003",
                    MemberId = "1234",
                    AccountId = "4321",
                    LoanId = "12345",
                    Amount = 12345,
                    Comment = "Test Payment",
                    Glcode = "",
                    RunId = 12,
                    StatusCode = "100",
                    StatusDesc = "Error",
                    SourceApp = "Unit Test",
                    Created = DateTime.Parse("6/15/2021"),
                    ModifiedDate = DateTime.Parse("6/16/2021"),
                    ModifiedBy = "test"
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupConfiguration(out Mock<ICuGenericRepository<Configuration>> repo, out List<Configuration> list)
        {
            list = new List<Configuration>
            {
                new Configuration
                {
                    Id = new Guid("b970f711-cfcc-4d8d-ac83-44ddea530c58"),
                    ConfigName = "Test.Update",
                    ConfigValue = "test",
                    Description = "A test configuration for updating",
                    LastChangeDate = DateTime.Now,
                    LastUpdatedBy = "test"
                },
                new Configuration
                {
                    Id = new Guid("48189eb4-7b69-44f5-b7d9-417ff4a419f5"),
                    ConfigName = "Test.Delete",
                    ConfigValue = "test",
                    Description = "A test configuration for deleting",
                    LastChangeDate = DateTime.Now,
                    LastUpdatedBy = "test"
                },
                new Configuration
                {
                    Id = new Guid("1fcae3af-805c-4c9c-bd96-a118e6127d6b"),
                    ConfigName = "PsiServiceHostPrefix",
                    ConfigValue = "",
                    Description = "",
                    LastChangeDate = DateTime.Now,
                    LastUpdatedBy = "test"
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupDeliveryDates(out Mock<ICuGenericRepository<DeliveryDate>> repo, out List<DeliveryDate> list)
        {
            list = new List<DeliveryDate>
            {
                new DeliveryDate
                {
                    CurrentDate = DateTime.Parse("05/20/2021"),
                    CheckDate = DateTime.Parse("05/25/2021"),
                    ElectronicDate = DateTime.Parse("05/22/2021")
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupHolidays(out Mock<IWarehouseGenericRepository<Holiday>> repo, out List<Holiday> list)
        {
            list = new List<Holiday>
            {
                new Holiday
                {
                    Id = 1,
                    Date = DateTime.Parse("05/20/2021"),
                    Description = "Test Holiday",
                    SponsorId = "0"
                },
                new Holiday
                {
                    Id = 2,
                    Date = DateTime.Parse("05/22/2021"),
                    Description = "Test Cu Holiday",
                    SponsorId = "1234"
                },
                new Holiday
                {
                    Id = 3,
                    Date = DateTime.Parse("09/20/2021"),
                    Description = "Test Cu Holiday 2",
                    SponsorId = "1234"
                },
                new Holiday
                {
                    Id = 4,
                    Date = DateTime.Parse("12/24/2021"),
                    Description = "Test Cu Holiday 3",
                    SponsorId = "1234"
                },
                new Holiday
                {
                    Id = 5,
                    Date = DateTime.Parse("7/4/2022"),
                    Description = "July4",
                    SponsorId = "1234"
                }
            };

            SetupWarehouseRepositoryWithSource(list, out repo);
        }

        public static void SetupContacts(out Mock<ICuGenericRepository<Contact>> repo, out List<Contact> list)
        {
            list = new List<Contact>
            {
                new Contact
                {
                    Id = new Guid("bbda7af6-9897-4146-9722-536b3b0fe85c"),
                    Created = DateTime.Parse("08/25/2021"),
                    Email = "test@test.com",
                    FirstName = "Test",
                    LastName = "Contacter",
                    Phone = "8015551234"
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupBadRecords(out Mock<IWarehouseGenericRepository<BadRecord>> repo, out List<BadRecord> list)
        {
            list = new List<BadRecord>
            {
                new BadRecord
                {
                    Created = DateTime.Parse("6/26/2021")
                },
                new BadRecord
                {
                    Created = DateTime.Parse("6/20/2021")
                }
            };

            SetupWarehouseRepositoryWithSource(list, out repo);
        }

        public static void SetupInstitutionInfo(out Mock<ICuGenericRepository<InstitutionInfo>> repo, out List<InstitutionInfo> list)
        {
            list = new List<InstitutionInfo>
            {
                new InstitutionInfo
                {
                    Id = new Guid("6b78a7d5-5998-4446-83da-8cf96d542f8a"),
                    Prefix = "TST",
                    SponsorId = "1234",
                    Name = "Test Institution"
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupNotifications(out Mock<ICuGenericRepository<Notification>> repo, out List<Notification> list)
        {
            list = new List<Notification>
            {
                new Notification
                {
                    Id = new Guid("66569d8f-db27-4a55-b7c8-6b9bb05a0da6"),
                    ErrorNumber = 1,
                    StatusCode = 400,
                    EmailMember = true,
                    EmailMemberServices = true,
                    EmailSysOp = true,
                    MessageSubject = "<<DATE>> - This is a subject",
                    MessageBody = "<<DATE>> - This is a body"
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupSavedNotifications(out Mock<ICuGenericRepository<SavedNotification>> repo, out List<SavedNotification> list)
        {
            list = new List<SavedNotification>
            {
                new SavedNotification
                {
                    Id = 1,
                    MemberId = "1234567",
                    MemberEmail = "test@test.com",
                    PaymentId = "1234",
                    PaymentDate = DateTime.Parse("10-26-2021"),
                    Date = DateTime.Parse("10-27-2021"),
                    StatusCode = 100
                },
                new SavedNotification
                {
                    Id = 2,
                    MemberId = "1234567",
                    MemberEmail = "test@test.com",
                    PaymentId = "4321",
                    PaymentDate = DateTime.Parse("10-27-2021"),
                    Date = DateTime.Parse("10-28-2021"),
                    StatusCode = 100
                },
                new SavedNotification
                {
                    Id = 3,
                    MemberId = "1234567",
                    MemberEmail = "test@test.com",
                    PaymentId = "5678",
                    PaymentDate = DateTime.Parse("10-28-2021"),
                    Date = DateTime.Parse("10-29-2021"),
                    StatusCode = 100
                },
                new SavedNotification
                {
                    Id = 4,
                    MemberId = "1234567",
                    MemberEmail = "test2@test.com",
                    PaymentId = "5678",
                    PaymentDate = DateTime.Parse("10-28-2021"),
                    Date = DateTime.Parse("10-30-2021"),
                    StatusCode = 100
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupCustomerInfo(out Mock<ICuGenericRepository<CustomerInfo>> repo, out List<CustomerInfo> list)
        {
            list = new List<CustomerInfo>
            {
                new CustomerInfo
                {
                    Id = "TST-1234567",
                    Address1 = "1234 Sunshine Drive",
                    City = "Test",
                    State = "Test",
                    Country = "Test",
                    Email = "test@test.com",
                    MemberId = "1234567",
                    HomePhone = "8015551234",
                    Middle = "T",
                    ZipCode = "12345",
                    First = "Test",
                    Last = "Test"
                }
            };

            SetupRepositoryWithSource(list, out repo);
        }

        public static void SetupCreditUnions(out Mock<IWarehouseGenericRepository<GlobalPayee>> repo, out List<GlobalPayee> list)
        {
            list = new List<GlobalPayee>
            {
                new GlobalPayee
                {
                   InternalPayeeId = "9876",
                   PayeeName = "Global Corp."
                },
                new GlobalPayee
                {
                  InternalPayeeId = "1234",
                  PayeeName = "Semiglobal Corp."
                }
            };

            SetupWarehouseRepositoryWithSource(list, out repo);
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        private static void SetupRepositoryWithSource<T>(List<T> source, out Mock<ICuGenericRepository<T>> repo)
        {
            repo = new Mock<ICuGenericRepository<T>>();
            repo.Setup(x => x.All())
                .Returns(() => source);
            repo.Setup(x => x.AllAsync())
                .Returns(async () => source);
            repo.Setup(x => x.Get(It.IsAny<Guid>()))
                .Returns((Guid x) => source.FirstOrDefault(y =>
                {
                    dynamic z = y;
                    return z.Id == x;
                }));
            repo.Setup(x => x.Get(It.IsAny<Expression<Func<T, bool>>>()))
                .Returns((Expression<Func<T, bool>> x) => source.FirstOrDefault(x.Compile()));
            repo.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .Returns(async (Guid x) => source.FirstOrDefault(y =>
                {
                    dynamic z = y;
                    return z.Id == x;
                }));
            repo.Setup(x => x.GetAsync(It.IsAny<Expression<Func<T, bool>>>()))
                .Returns(async (Expression<Func<T, bool>> x) => source.FirstOrDefault(x.Compile()));
            repo.Setup(x => x.Find(It.IsAny<Expression<Func<T, bool>>>()))
                .Returns((Expression<Func<T, bool>> x) => source.Where(x.Compile()));
            repo.Setup(x => x.FindAsync(It.IsAny<Expression<Func<T, bool>>>()))
                .Returns(async (Expression<Func<T, bool>> x) => source.Where(x.Compile()));
            repo.Setup(x => x.Update(It.IsAny<T>()))
                .Returns((T x) => x);
            repo.Setup(x => x.Add(It.IsAny<T>()))
                .Returns((T x) =>
                {
                    dynamic o = x;
                    try
                    {
                        o.Id = Guid.NewGuid();
                    }
                    catch { }
                    source.Add((T)o);
                    return x;
                });
            repo.Setup(x => x.BulkInsertAsync(It.IsAny<List<T>>()))
                .Callback((List<T> x) =>
                {
                    foreach (var e in x.ToArray())
                    {
                        source.Add(e);
                    }
                });
            repo.Setup(x => x.Remove(It.IsAny<T>()))
                .Returns((T x) =>
                {
                    source.Remove(x);
                    return x;
                });
            repo.Setup(x => x.RemoveRange(It.IsAny<IEnumerable<T>>()))
                .Callback((IEnumerable<T> x) =>
                {
                    foreach (var e in x.ToArray())
                    {
                        source.Remove(e);
                    }
                });
            repo.Setup(x => x.SaveChanges());
            repo.Setup(x => x.SaveChangesAsync())
                .Returns(async () => { });
        }

        private static void SetupWarehouseRepositoryWithSource<T>(List<T> source, out Mock<IWarehouseGenericRepository<T>> repo)
        {
            repo = new Mock<IWarehouseGenericRepository<T>>();
            repo.Setup(x => x.All())
                .Returns(() => source);
            repo.Setup(x => x.Get(It.IsAny<Guid>()))
                .Returns((Guid x) => source.FirstOrDefault(y =>
                {
                    dynamic z = y;
                    return z.Id == x;
                }));
            repo.Setup(x => x.Get(It.IsAny<Expression<Func<T, bool>>>()))
                .Returns((Expression<Func<T, bool>> x) => source.FirstOrDefault(x.Compile()));
            repo.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .Returns(async (Guid x) => source.FirstOrDefault(y =>
                {
                    dynamic z = y;
                    return z.Id == x;
                }));
            repo.Setup(x => x.GetAsync(It.IsAny<Expression<Func<T, bool>>>()))
                .Returns(async (Expression<Func<T, bool>> x) => source.FirstOrDefault(x.Compile()));
            repo.Setup(x => x.Find(It.IsAny<Expression<Func<T, bool>>>()))
                .Returns((Expression<Func<T, bool>> x) => source.Where(x.Compile()));
            repo.Setup(x => x.FindAsync(It.IsAny<Expression<Func<T, bool>>>()))
                .Returns(async (Expression<Func<T, bool>> x) => source.Where(x.Compile()));
            repo.Setup(x => x.Update(It.IsAny<T>()))
                .Returns((T x) => x);
            repo.Setup(x => x.Add(It.IsAny<T>()))
                .Returns((T x) =>
                {
                    dynamic o = x;
                    try
                    {
                        o.Id = Guid.NewGuid();
                    }
                    catch { }
                    source.Add((T)o);
                    return x;
                });
            repo.Setup(x => x.Remove(It.IsAny<T>()))
                .Returns((T x) =>
                {
                    source.Remove(x);
                    return x;
                });
            repo.Setup(x => x.RemoveRange(It.IsAny<IEnumerable<T>>()))
                .Callback((IEnumerable<T> x) =>
                {
                    foreach (var e in x.ToArray())
                    {
                        source.Remove(e);
                    }
                });
            repo.Setup(x => x.SaveChanges());
            repo.Setup(x => x.SaveChangesAsync())
                .Returns(async () => { });
        }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
    }
}
