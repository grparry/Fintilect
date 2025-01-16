using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;
using Omega.Presentation.Mvc.Models.TargetedMarketing;
using Psi.Business.ServiceContracts.RequestResponse.TargetedMarketing;
using System.Web.Helpers;
using Newtonsoft.Json;
using System.Runtime.Serialization.Formatters;
using System.Web.Mvc;

namespace Omega.Presentation.Mvc.Business
{
    public class TargetetMarketingRepository
    {
        private readonly JavaScriptSerializer _javaScriptSerializer = new JavaScriptSerializer();

        #region Promotions

        // Get all promotions
        public List<Promotion> GetAllPromotions()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "id=1", "Promotions"));

            var promotionList = (List<Promotion>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Promotion>));

            return promotionList;
        }

        // Get a single promotion
        public Promotion GetSinglePromotion(int id)
        {
            var sendParams = "PromotionId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sendParams, "Promotion"));

            var promotion = (Promotion)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Promotion));
            return promotion;
        }

        // Create a new promotion - POST
        public Promotion CreateNewPromotion(Promotion promo)
        {
            var json = _javaScriptSerializer.Serialize(promo);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(1, json, "Promotion"));

            var promotion = (Promotion)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Promotion));
            return promotion;
        }

        // Update existing promotion - PUT
        public string UpdateExistingPromotion(Promotion promo)
        {
            var json = _javaScriptSerializer.Serialize(promo);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPutResponse>(new TargetedMarketingAdminPutRequest(1, json, "Promotion"));
            var result = Json.Decode(response.JsonPayload);

            return result.ResponseMessage;
        }

        // Delete a promotion
        public bool DeletePromotion(int id)
        {
            var sendParams = "PromotionId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(null, sendParams, "Promotion"));

            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));
            var isSuccess = crudResp.ResponseMessage.ToLower() == "success";

            return isSuccess;
        }
        #endregion Promotions


        #region Account_Groups
        // Get Account Groups
        public List<Criteria_AccountNumberGroup> GetAllAcountGroups()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "id=1", "Criteria_AccountNumberGroups"));
            var accountGroupList = (List<Criteria_AccountNumberGroup>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Criteria_AccountNumberGroup>));

            return accountGroupList;
        }
        
        // Get a single promotion
        public Criteria_AccountNumberGroup GetSingleAccountGroup(int id)
        {
            var sendParams = "AccountNumberGroupId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sendParams, "Criteria_AccountNumberGroup"));

            var accountGroup = (Criteria_AccountNumberGroup)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Criteria_AccountNumberGroup));

            return accountGroup;
        }

        public List<Criteria_AccountNumberGroup> GetAllAcountGroupsForPromotion(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "promotionId=" + id, "Criteria_AccountNumberGroup_ByPromotionId"));
            var accountGroupList = (List<Criteria_AccountNumberGroup>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Criteria_AccountNumberGroup>));

            return accountGroupList;
        }

        public string CreateQualification_AccountNumberMatch_For_Promotion_AccountGroupList(int promotionId, List<int> accountGroups)
        {
            var sb = new StringBuilder();
            sb.Append(string.Concat("promotionId=", promotionId));
            sb.Append(string.Concat("&accountGroupsString=", string.Join(",", accountGroups)));
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sb.ToString(), "Qualification_AccountNumberMatch_Create_ForPromotion_AccountGroupList"));
            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));

            return crudResp.ResponseMessage.ToLower();
        }

        public string DeleteQualification_AccountNumberMatch_For_Promotion_AccountGroup(int promotionId, int accountGroup)
        {
            var query = string.Concat("promotionId=", promotionId, "&accountGroup=", accountGroup);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, query, "Delete_AccountNumberGroups_With_Qualification_AccountGroupMatch"));
            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));

            return crudResp.ResponseMessage.ToLower();
        }

        // Create a new account group - POST
        public Criteria_AccountNumberGroup CreateNewAccountGroup(Criteria_AccountNumberGroup accountGroup)
        {
            var json = _javaScriptSerializer.Serialize(accountGroup);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(1, json, "Criteria_AccountNumberGroup"));

            var acctGroup = (Criteria_AccountNumberGroup)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Criteria_AccountNumberGroup));

            return acctGroup;
        }

        // Update existing account group - PUT
        public string UpdateExistingAccountGroup(Criteria_AccountNumberGroup accountGroup)
        {
            var json = _javaScriptSerializer.Serialize(accountGroup);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPutResponse>(new TargetedMarketingAdminPutRequest(1, json, "Criteria_AccountNumberGroup"));
            dynamic result = Json.Decode(response.JsonPayload);

            //var acctGroup = (Criteria_AccountNumberGroup)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Criteria_AccountNumberGroup));

            return result.ResponseMessage;
        }

        // Delete an account group
        public bool DeleteAccountGroup(int id)
        {
            var sendParams = "AccountNumberGroupId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(1, sendParams, "Criteria_AccountNumberGroup"));


            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));
            var isSuccess = crudResp.ResponseMessage.ToLower() == "success";

            return isSuccess;
        }
        #endregion Account_Groups
        
        #region Qualifications
        public List<Qualification> GetAllQualificationInAPromotion(int promotionId)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "PromotionId=" + promotionId, "QualificationsByPromotionId"));
            var resultList = (List<Qualification>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Qualification>));

            return resultList;
        }
        
        public Qualification GetSingleQualification(int id)
        {
            var sendParams = "QualificationId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sendParams, "Qualification"));

            var result = (Qualification)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Qualification));

            return result;
        }
        
        public bool CreateNewQualification(Qualification data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(null, json, "Qualification"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }

        public bool UpdateExistingQualification(Qualification data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPutResponse>(new TargetedMarketingAdminPutRequest(null, json, "Qualification"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }

        public bool DeleteQualification(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(null, "QualificationId=" + id, "Qualification"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }
        #endregion Qualifications
        
        #region Qualification by AccountNumber
        public List<Qualification_AccountNumberMatch> GetAllQualificationAcctNumMatchesByQualificationId(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "QualificationId=" + id, "Qualification_AccountNumberMatchesByQualificationId"));
            var resultList = (List<Qualification_AccountNumberMatch>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Qualification_AccountNumberMatch>));

            return resultList;
        }

        public Qualification_AccountNumberMatch GetSingleQualificationAcctNumMatch(int id)
        {
            var sendParams = "AccountNumberMatchId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sendParams, "Qualification_AccountNumberMatch"));

            var result = (Qualification_AccountNumberMatch)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Qualification_AccountNumberMatch));

            return result;
        }
        
        public bool CreateNewQualificationAcctNumMatch(Qualification data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(null, json, "Qualification_AccountNumberMatch"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }

        public bool UpdateExistingQualificationAcctNumMatch(Qualification data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPutResponse>(new TargetedMarketingAdminPutRequest(null, json, "Qualification_AccountNumberMatch"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }
        
        public bool DeleteQualificationAcctNumMatch(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(null, "AccountNumberMatchId=" + id, "Qualification_AccountNumberMatch"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }
        #endregion Qualifications
        
        #region Images
        public List<Image> GetAllImages()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "Id=1", "Images"));

            // Necessary to use this code to deserialize the byte[] in the image object. Otherwize, the standard serializer with throw an error
            var jsonSettings = new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Objects,
                TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple
            };
            var resultList = JsonConvert.DeserializeObject<List<Image>>(response.JsonPayload, jsonSettings);

            return resultList;
        }
        
        public Image GetSingleImage(int id)
        {
            var sendParams = "ImageId=" + id.ToString();
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sendParams, "Image"));

            // Necessary to use this code to deserialize the byte[] in the image object. Otherwize, the standard serializer with throw an error
            var jsonSettings = new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Objects,
                TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple
            };
            var result = JsonConvert.DeserializeObject<Image>(response.JsonPayload, jsonSettings);

            return result;
        }

        public bool CreateNewImage(Image data)
        {
            _javaScriptSerializer.MaxJsonLength = 4194304; // 4MB. this is to prevent 'Error during serialization or deserialization using the JSON JavaScriptSerializer' where filesize exeeds default.
            ContentResult resultData = new ContentResult();
            resultData.Content = _javaScriptSerializer.Serialize(data);
            resultData.ContentType = "application/json";

            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(null, resultData.Content, "Image"));
 
            // Necessary to use this code to deserialize the byte[] in the image object. Otherwize, the standard serializer with throw an error
            var jsonSettings = new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Objects,
                TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple
            };
            var result = JsonConvert.DeserializeObject<Image>(response.JsonPayload, jsonSettings);
            var isSuccess = result.ImageId > 0;

            return isSuccess;
        }

        public bool UpdateExistingImage(Image data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPutResponse>(new TargetedMarketingAdminPutRequest(null, json, "Image"));

            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));
            var isSuccess = crudResp.ResponseMessage.ToLower() == "success";

            return isSuccess;
        }

        public bool DeleteImage(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(null, "ImageId=" + id, "Image"));

            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));
            var isSuccess = crudResp.ResponseMessage.ToLower() == "success";

            return isSuccess;
        }

        #endregion Images

        #region Slots
        public List<Slot> GetAllSlotsByChannel(string channelName)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "ChannelId=" + channelName, "SlotsByChannelId"));
            var resultList = (List<Slot>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Slot>));
            return resultList;
        }

        public List<Slot> GetAllSlots()
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "id=1", "Slots"));
            var resultList = (List<Slot>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Slot>));
            return resultList;
        }

        public Slot GetSingleSlot(int id)
        {
            var sendParams = "SlotId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sendParams, "Slot"));

            var result = (Slot)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Slot));

            return result;
        }

        public bool CreateNewSlot(Slot data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(null, json, "Slot"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }

        public bool UpdateExistingSlot(Slot data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPutResponse>(new TargetedMarketingAdminPutRequest(null, json, "Slot"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }


        public string GetRotationForSlot(int id)
        {
            var sendParams = "SlotId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sendParams, "RotateSlot"));
            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));

            return crudResp.ResponseMessage;
        }


        public bool SetRotationForSlot(Slot data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPutResponse>(new TargetedMarketingAdminPutRequest(null, json, "RotateSlot"));

            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));
            var isSuccess = crudResp.ResponseMessage.ToLower() == "success";

            return isSuccess;
        }


        public bool DeleteSlot(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(null, "SlotId=" + id, "Slot"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }
        #endregion Slots


        #region relationships
        public List<Xref_PromoSlot> GetPromoSlotsByPromotionId(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "PromotionId=" + id, "XRefPromoSlots_ByPromotionID"));
            var resultList = (List<Xref_PromoSlot>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Xref_PromoSlot>));
            return resultList;
        }

        public bool CreateNewPromoSlot(Xref_PromoSlot data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(null, json, "Xref_PromoSlot"));

            var resultList = (Xref_PromoSlot)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(Xref_PromoSlot));
            return resultList.XrefId > 0;
        }

        public bool DeletePromoSlot(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(null, "XrefId=" + id, "Xref_PromoSlot"));

            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));
            var isSuccess = crudResp.ResponseMessage.ToLower() == "success";

            return isSuccess;
        }

        public List<Xref_PromoSlotImage> GetPromoSlotImagesByPromoSlotId(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "PromoSlotId=" + id, "XRefPromoSlotImages_ByPromoSlotID"));
            var resultList = (List<Xref_PromoSlotImage>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Xref_PromoSlotImage>));
            return resultList;
        }

        public List<PromoImage> GetPromoImagesForPromoSlot(int id)
        {
            var resultList = new List<PromoImage>();
            var promoImageSlots = GetPromoSlotImagesByPromoSlotId(id);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "PromoSlotId=" + id, "XRefPromoImages_ByPromoSlotID"));

            // Necessary to use this code to deserialize the byte[] in the image object. Otherwize, the standard serializer with throw an error
            var jsonSettings = new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Objects,
                TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple
            };
            var resultListImages = JsonConvert.DeserializeObject<List<Image>>(response.JsonPayload, jsonSettings);

            foreach (var promoSlotImage in promoImageSlots)
            {
                var promoImage = new PromoImage(resultListImages.FirstOrDefault(x => x.ImageId == promoSlotImage.ImageId))
                {
                    PromoSlotImageId = promoSlotImage.XrefId
                };
                resultList.Add(promoImage);

            }
            return resultList;
        }

        public bool CreateNewPromoSlotImage(Xref_PromoSlotImage data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(null, json, "Xref_PromoSlotImage"));

            var item = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }

        public bool DeletePromoSlotImage(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(null, "XrefId=" + id, "Xref_PromoSlotImage"));

            var crudResp = (CrudResponse)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(CrudResponse));
            var isSuccess = crudResp.ResponseMessage.ToLower() == "success";

            return isSuccess;
        }


        public List<Xref_QualificationAcctNumGroup> GetQualificationAcctNumGroupByQualificationId(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, "AccountNumberQualificationId=" + id, "XRef_QualificationAcctGroups_ByQualificationID"));
            var resultList = (List<Xref_QualificationAcctNumGroup>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Xref_QualificationAcctNumGroup>));
            return resultList;
        }

        public bool CreateNewQualificationAcctNumGroup(Xref_QualificationAcctNumGroup data)
        {
            var json = _javaScriptSerializer.Serialize(data);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(null, json, "XRef_QualificationAcctGroup"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }

        public bool DeleteQualificationAcctNumGroup(int id)
        {
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminDeleteResponse>(new TargetedMarketingAdminDeleteRequest(null, "XrefId=" + id, "XRef_QualificationAcctGroup"));

            var stringList = (List<CrudResponse>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<CrudResponse>));
            var item = stringList.First();

            var isSuccess = Convert.ToBoolean(item.ResponseMessage);

            return isSuccess;
        }
        #endregion relationships


        #region Features
        // Get all the features for this promotion
        public List<Feature> GetAllFeaturesForPromotion(int id)
        {
            var sendParams = "PromotionId=" + id;
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminGetResponse>(new TargetedMarketingAdminGetRequest(1, sendParams, "FeaturesIdListByPromotionId"));
            var featuresMetaIdList = (List<Feature>)_javaScriptSerializer.Deserialize(response.JsonPayload, typeof(List<Feature>));

            return featuresMetaIdList;
        }

        // Add/Update Features list for this promotion
        public string AddUpdateFeaturesForPromotion(List<Feature> featureList)
        {
            var json = _javaScriptSerializer.Serialize(featureList);
            var response = Psi.Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<TargetedMarketingAdminPostResponse>(new TargetedMarketingAdminPostRequest(1, json, "AddUpdateFeaturesByPromotionId"));

            var result = response.JsonPayload;
            result = _javaScriptSerializer.Deserialize<string>(result);

            return result;
        }
        #endregion Features

    }
}