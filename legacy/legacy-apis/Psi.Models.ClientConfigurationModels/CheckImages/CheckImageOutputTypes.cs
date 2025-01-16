namespace Psi.Data.Models.ClientConfigurationModels.CheckImages
{
    /// <summary>
    /// Available check image output types
    /// </summary>
    /// <remarks>
    /// Mirrors XMLItemMobileDepositImageFormatType with the addition of TIFF and PDF
    /// Vertifi returns images as URL when we request a PDF
    /// </remarks>
    public enum CheckImageOutputTypes
    {
        JPEG,
        PNG,
        URL,
        TIFF,
        PDF
    }
}
