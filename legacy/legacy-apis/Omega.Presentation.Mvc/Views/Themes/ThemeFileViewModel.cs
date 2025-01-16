using System;
using System.Web.Mvc;
using Psi.Data.Models.Domain.Themes;
using static System.String;

namespace Omega.Presentation.Mvc.Views.Themes
{
    public class ThemeFileViewModel:IComparable<ThemeFileViewModel>
    {
	    public string FileName { get; set; }

        public string FileNameOnly
        {
            get
            {
                var lastSlashIndex = FileName.LastIndexOf("/", StringComparison.InvariantCultureIgnoreCase);
                return lastSlashIndex == -1 ? FileName : FileName.Substring(lastSlashIndex + 1);
            }
        }

	    public FileType FileType
	    {
		    get
		    {
			    var filename = FileName.ToLower();

			    if (filename.EndsWith(".png") || filename.EndsWith(".jpg") || filename.EndsWith(".jpeg"))
				    return FileType.Image;
			    if (filename.EndsWith(".js"))
				    return FileType.Javascript;
			    if (filename.EndsWith(".json"))
				    return FileType.Json;
			    if (filename.EndsWith(".html"))
				    return FileType.Html;

				return FileType.Unspecified;
		    }
	    }

        public Guid ThemePublicId { get; set; }
        [AllowHtml]
        public string ContentString { get; set; }
        [AllowHtml]
	    public string ParentContentString { get; set; }
        [AllowHtml]
        public string OutputContentString { get; set; }

		public Guid PublicId { get; set; }
        
        public string Path { get; set; }
        public string FileSizeString { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

		/// <summary>
		/// The text that should be displayed when removing the file from the theme.  
		/// </summary>
		public string DeleteFileVerb()
        {
	        if (ThemeFileParentAction.HasValue)
		        return "Remove Override";

			if (ThemeBeingEdited != ThemePublicId)
				return "Exclude";

	        return "Delete";
        }

        public ThemeInstanceFileParentAction? ThemeFileParentAction { get; set; }
	    public Guid ThemeBeingEdited { get; set; }

	    public int CompareTo(ThemeFileViewModel other)
        {
            if (other == null)
                return 1;       // this is greater

            var thisPath = Path?.ToLower();
            var thatPath = other.Path?.ToLower();

            // If they share part of the same path then strip that out for the comparison.
            if (!string.IsNullOrEmpty(thisPath) && !string.IsNullOrEmpty(thatPath))
            {
                if (thisPath != null && thisPath.Contains(thatPath ?? throw new InvalidOperationException()))
                {
                    thisPath = thisPath.Substring(thatPath.Length);
                    thatPath = null;
                }
                else if (thatPath != null && thatPath.Contains(thisPath ?? throw new InvalidOperationException()))
                {
                    thatPath = thatPath.Substring(thisPath.Length);
                    thisPath = null;
                }
            }

            // Want the files at the end
            if (string.IsNullOrEmpty(thisPath) && !string.IsNullOrEmpty(thatPath))
                return 1;
            if (!string.IsNullOrEmpty(thisPath) && string.IsNullOrEmpty(thatPath))
                return -1;

            return thisPath == thatPath ? Compare(FileNameOnly, other.FileNameOnly, StringComparison.Ordinal) : Compare(Path, other.Path, StringComparison.Ordinal);
        }
    }

	public enum FileType
	{
		Unspecified,
		Javascript,
		Html,
		Image,
        Json
	}
}