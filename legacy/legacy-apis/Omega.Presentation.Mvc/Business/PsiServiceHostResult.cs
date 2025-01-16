using Psi.Business.ServiceContracts.RequestResponse;

namespace Omega.Presentation.Mvc.Business
{
    public class PsiServiceHostResult<T>
    {
        public T Payload { get; set; }
        public bool WasSuccessful { get; set; }
        public string WhyNotSuccessful { get; set; }
        public OutOfBandRequired OutOfBandRequired { get; set; }
    }
}
