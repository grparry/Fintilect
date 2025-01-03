using ConnectBillPay.Core.Constants;
using ConnectBillPay.Core.Models;
using ConnectBillPay.Core.Repositories.ConnectBillPayCu;
using ConnectBillPay.Core.Repositories.ConnectBillPayWarehouse;
using System.Threading.Tasks;

namespace ConnectBillPay.Services
{
    public static class PayeeExtensions
    {
        public static async Task<object> GetMemberPayeeAsync(this UserPayeeList userPayeeList, ICuGenericRepository<PersonalPayee> personalPayeeRepository, IWarehouseGenericRepository<GlobalPayee> globalPayeeRepository)
        {
            if (userPayeeList.PayeeType == PayeeType.Personal ||
                userPayeeList.PayeeId != userPayeeList.FisPayeeId)
            {
                return await personalPayeeRepository.GetAsync(x => x.PayeeId == userPayeeList.PayeeId);
            }

            return await globalPayeeRepository.GetAsync(x => x.InternalPayeeId == userPayeeList.PayeeId);
        }
    }
}
