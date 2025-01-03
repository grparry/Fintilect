using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Tests.Services
{
    public static class TestRepos
    {
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

        public static void SetupCreditUnions(out Mock<IWarehouseGenericRepository<CreditUnion>> repo, out List<CreditUnion> list)
        {
            list = new List<CreditUnion>
            {
                new CreditUnion
                {
                    SponsorId = "1234567",
                    SponsorName = "Test Credit Union",
                    RoutingId = "7654321",
                    Url = "https://localhost:5001"
                },
                new CreditUnion
                {
                    SponsorId = "1111111",
                    SponsorName = "Test Credit Union 2",
                    RoutingId = "7654321",
                    Url = "https://localhost:5001"
                }
            };

            SetupWarehouseRepositoryWithSource(list, out repo);
        }

        public static void SetupFisExceptionsCorrections(out Mock<IWarehouseGenericRepository<FisExceptionsCorrection>> repo, out List<FisExceptionsCorrection> list)
        {
            list = new List<FisExceptionsCorrection>
            {
                new FisExceptionsCorrection
                {
                    Id = 1,
                    FisExceptionId = 1
                },
                new FisExceptionsCorrection
                {
                    Id = 2,
                    FisExceptionId = 2
                }
            };

            SetupWarehouseRepositoryWithSource(list, out repo);
        }

        public static void SetupPaymentExceptions(out Mock<IWarehouseGenericRepository<PaymentException>> repo, out List<PaymentException> list)
        {
            var outList = new List<PaymentException>
            {
                new PaymentException
                {
                    Id = 1,
                    SponsorId = "1234567",
                    SponsorTransactionId = "123",
                    ServiceRequestDate = DateTime.Parse("12/26/2021"),
                    Created = DateTime.Parse("12/26/2021")
                },
                new PaymentException
                {
                    Id = 2,
                    SponsorId = "1111111",
                    SponsorTransactionId = "123",
                    ServiceRequestDate = DateTime.Parse("12/20/2021"),
                    Created = DateTime.Parse("12/20/2021")
                }
            };
            list = outList;

            SetupWarehouseRepositoryWithSource(list, out repo);

            SetupFisExceptionsCorrections(out var correctionRepoMock, out var correctionsList);

            repo.Setup(x => x.GetExceptionAndCorrectionsAsync(It.IsAny<Expression<Func<PaymentExceptionCorrection, bool>>>()))
                .Returns(async (Expression<Func<PaymentExceptionCorrection, bool>> x) =>
                {
                    var pairs = outList.Select(x => new PaymentExceptionCorrection
                    {
                        Exception = x
                    });

                    foreach (var pair in pairs)
                    {
                        foreach (var correction in correctionsList)
                        {
                            if (correction.FisExceptionId == pair.Exception.Id)
                            {
                                pair.Correction = correction;
                            }
                        }
                    }

                    var filter = x.Compile();
                    return pairs.Where(filter).ToList();
                });
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
                    CountryCode = "1"
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
                    CountryCode = "1"
                }
            };

            SetupWarehouseRepositoryWithSource(list, out repo);
        }

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
