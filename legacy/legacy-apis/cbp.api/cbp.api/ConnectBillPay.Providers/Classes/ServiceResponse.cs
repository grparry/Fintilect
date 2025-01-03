namespace ConnectBillPay.Services.Classes
{
    public class ServiceResponse
    {
        public int StatusCode { get; set; }
    }

    public class ServiceResponse<T> : ServiceResponse
    {
        public T Object { get; set; }
    }
}
