/** /// <summary>
/// Available check image output types
/// </summary>
/// <remarks>
/// Mirrors XMLItemMobileDepositImageFormatType with the addition of TIFF and PDF
/// Vertifi returns images as URL when we request a PDF
/// </remarks> */
export enum CheckImageOutputTypes {
    JPEG = 0,
    PNG = 1,
    URL = 2,
    TIFF = 3,
    PDF = 4,
}
