import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CrossAccountSettingsConfig {
    ShouldUseCrossAccountOwnerNameAsCrossAccountDescription: boolean;
    HouseHoldingCreditCardHistoryEnabled: boolean;
    DisclosureAcceptanceEnabled: boolean;
    DisclosureAcceptanceFlag: string;
    HideAbilityToRequestPermissionsForAnotherAccount: boolean;
    ShouldShowSsoLinkForCrossAccountLoans: boolean;
    DisallowWithdrawalsFromCreditCards: boolean;
    DisableCreditCardMoreDetailButton: boolean;
    GetHouseholdingPermissionsFromCrossAccountNode: boolean;
    ReadCreditCardsFromCore: boolean;
    IsCrossAccountInquiryByTin: boolean;
    GrantInquiryPermissionDelayTime: number;
    GrantDepositPermissionDelayTime: number;
    GrantWithdrawalPermissionDelayTime: number;
    CheckHouseHoldingValuesFromDatabase: boolean;
    HouseholdingPermissionSource: string;
    DeleteSubAccountNoHouseholding: boolean;
}

export class CrossAccountSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CrossAccountSettings'
    };


            private _shouldUseCrossAccountOwnerNameAsCrossAccountDescription: boolean;
            get shouldUseCrossAccountOwnerNameAsCrossAccountDescription(): boolean {
                return this._shouldUseCrossAccountOwnerNameAsCrossAccountDescription;
            }
            set shouldUseCrossAccountOwnerNameAsCrossAccountDescription(value: boolean) {
                this._shouldUseCrossAccountOwnerNameAsCrossAccountDescription = value;
            }

            private _houseHoldingCreditCardHistoryEnabled: boolean;
            get houseHoldingCreditCardHistoryEnabled(): boolean {
                return this._houseHoldingCreditCardHistoryEnabled;
            }
            set houseHoldingCreditCardHistoryEnabled(value: boolean) {
                this._houseHoldingCreditCardHistoryEnabled = value;
            }

            private _disclosureAcceptanceEnabled: boolean;
            get disclosureAcceptanceEnabled(): boolean {
                return this._disclosureAcceptanceEnabled;
            }
            set disclosureAcceptanceEnabled(value: boolean) {
                this._disclosureAcceptanceEnabled = value;
            }

            private _disclosureAcceptanceFlag: string;
            get disclosureAcceptanceFlag(): string {
                return this._disclosureAcceptanceFlag;
            }
            set disclosureAcceptanceFlag(value: string) {
                this._disclosureAcceptanceFlag = value;
            }

            private _hideAbilityToRequestPermissionsForAnotherAccount: boolean;
            get hideAbilityToRequestPermissionsForAnotherAccount(): boolean {
                return this._hideAbilityToRequestPermissionsForAnotherAccount;
            }
            set hideAbilityToRequestPermissionsForAnotherAccount(value: boolean) {
                this._hideAbilityToRequestPermissionsForAnotherAccount = value;
            }

            private _shouldShowSsoLinkForCrossAccountLoans: boolean;
            get shouldShowSsoLinkForCrossAccountLoans(): boolean {
                return this._shouldShowSsoLinkForCrossAccountLoans;
            }
            set shouldShowSsoLinkForCrossAccountLoans(value: boolean) {
                this._shouldShowSsoLinkForCrossAccountLoans = value;
            }

            private _disallowWithdrawalsFromCreditCards: boolean;
            get disallowWithdrawalsFromCreditCards(): boolean {
                return this._disallowWithdrawalsFromCreditCards;
            }
            set disallowWithdrawalsFromCreditCards(value: boolean) {
                this._disallowWithdrawalsFromCreditCards = value;
            }

            private _disableCreditCardMoreDetailButton: boolean;
            get disableCreditCardMoreDetailButton(): boolean {
                return this._disableCreditCardMoreDetailButton;
            }
            set disableCreditCardMoreDetailButton(value: boolean) {
                this._disableCreditCardMoreDetailButton = value;
            }

            private _getHouseholdingPermissionsFromCrossAccountNode: boolean;
            get getHouseholdingPermissionsFromCrossAccountNode(): boolean {
                return this._getHouseholdingPermissionsFromCrossAccountNode;
            }
            set getHouseholdingPermissionsFromCrossAccountNode(value: boolean) {
                this._getHouseholdingPermissionsFromCrossAccountNode = value;
            }

            private _readCreditCardsFromCore: boolean;
            get readCreditCardsFromCore(): boolean {
                return this._readCreditCardsFromCore;
            }
            set readCreditCardsFromCore(value: boolean) {
                this._readCreditCardsFromCore = value;
            }

            private _isCrossAccountInquiryByTin: boolean;
            get isCrossAccountInquiryByTin(): boolean {
                return this._isCrossAccountInquiryByTin;
            }
            set isCrossAccountInquiryByTin(value: boolean) {
                this._isCrossAccountInquiryByTin = value;
            }

            private _grantInquiryPermissionDelayTime: number;
            get grantInquiryPermissionDelayTime(): number {
                return this._grantInquiryPermissionDelayTime;
            }
            set grantInquiryPermissionDelayTime(value: number) {
                this._grantInquiryPermissionDelayTime = value;
            }

            private _grantDepositPermissionDelayTime: number;
            get grantDepositPermissionDelayTime(): number {
                return this._grantDepositPermissionDelayTime;
            }
            set grantDepositPermissionDelayTime(value: number) {
                this._grantDepositPermissionDelayTime = value;
            }

            private _grantWithdrawalPermissionDelayTime: number;
            get grantWithdrawalPermissionDelayTime(): number {
                return this._grantWithdrawalPermissionDelayTime;
            }
            set grantWithdrawalPermissionDelayTime(value: number) {
                this._grantWithdrawalPermissionDelayTime = value;
            }

            private _checkHouseHoldingValuesFromDatabase: boolean;
            get checkHouseHoldingValuesFromDatabase(): boolean {
                return this._checkHouseHoldingValuesFromDatabase;
            }
            set checkHouseHoldingValuesFromDatabase(value: boolean) {
                this._checkHouseHoldingValuesFromDatabase = value;
            }

            private _householdingPermissionSource: string;
            get householdingPermissionSource(): string {
                return this._householdingPermissionSource;
            }
            set householdingPermissionSource(value: string) {
                this._householdingPermissionSource = value;
            }

            private _deleteSubAccountNoHouseholding: boolean;
            get deleteSubAccountNoHouseholding(): boolean {
                return this._deleteSubAccountNoHouseholding;
            }
            set deleteSubAccountNoHouseholding(value: boolean) {
                this._deleteSubAccountNoHouseholding = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CrossAccountSettings.ShouldUseCrossAccountOwnerNameAsCrossAccountDescription", value: this._shouldUseCrossAccountOwnerNameAsCrossAccountDescription, dataType: 'boolean', label: "Should Use Cross Account Owner Name As Cross Account Description" },
                { key: "CrossAccountSettings.HouseHoldingCreditCardHistoryEnabled", value: this._houseHoldingCreditCardHistoryEnabled, dataType: 'boolean', label: "House Holding Credit Card History Enabled" },
                { key: "CrossAccountSettings.DisclosureAcceptanceEnabled", value: this._disclosureAcceptanceEnabled, dataType: 'boolean', label: "Disclosure Acceptance Enabled" },
                { key: "CrossAccountSettings.DisclosureAcceptanceFlag", value: this._disclosureAcceptanceFlag, dataType: 'string', label: "Disclosure Acceptance Flag" },
                { key: "CrossAccountSettings.HideAbilityToRequestPermissionsForAnotherAccount", value: this._hideAbilityToRequestPermissionsForAnotherAccount, dataType: 'boolean', label: "Hide Ability To Request Permissions For Another Account" },
                { key: "CrossAccountSettings.ShouldShowSsoLinkForCrossAccountLoans", value: this._shouldShowSsoLinkForCrossAccountLoans, dataType: 'boolean', label: "Should Show Sso Link For Cross Account Loans" },
                { key: "CrossAccountSettings.DisallowWithdrawalsFromCreditCards", value: this._disallowWithdrawalsFromCreditCards, dataType: 'boolean', label: "Disallow Withdrawals From Credit Cards" },
                { key: "CrossAccountSettings.DisableCreditCardMoreDetailButton", value: this._disableCreditCardMoreDetailButton, dataType: 'boolean', label: "Disable Credit Card More Detail Button" },
                { key: "CrossAccountSettings.GetHouseholdingPermissionsFromCrossAccountNode", value: this._getHouseholdingPermissionsFromCrossAccountNode, dataType: 'boolean', label: "Get Householding Permissions From Cross Account Node" },
                { key: "CrossAccountSettings.ReadCreditCardsFromCore", value: this._readCreditCardsFromCore, dataType: 'boolean', label: "Read Credit Cards From Core" },
                { key: "CrossAccountSettings.IsCrossAccountInquiryByTin", value: this._isCrossAccountInquiryByTin, dataType: 'boolean', label: "Is Cross Account Inquiry By Tin" },
                { key: "CrossAccountSettings.GrantInquiryPermissionDelayTime", value: this._grantInquiryPermissionDelayTime, dataType: 'number', label: "Grant Inquiry Permission Delay Time" },
                { key: "CrossAccountSettings.GrantDepositPermissionDelayTime", value: this._grantDepositPermissionDelayTime, dataType: 'number', label: "Grant Deposit Permission Delay Time" },
                { key: "CrossAccountSettings.GrantWithdrawalPermissionDelayTime", value: this._grantWithdrawalPermissionDelayTime, dataType: 'number', label: "Grant Withdrawal Permission Delay Time" },
                { key: "CrossAccountSettings.CheckHouseHoldingValuesFromDatabase", value: this._checkHouseHoldingValuesFromDatabase, dataType: 'boolean', label: "Check House Holding Values From Database" },
                { key: "CrossAccountSettings.HouseholdingPermissionSource", value: this._householdingPermissionSource, dataType: 'string', label: "Householding Permission Source" },
                { key: "CrossAccountSettings.DeleteSubAccountNoHouseholding", value: this._deleteSubAccountNoHouseholding, dataType: 'boolean', label: "Delete Sub Account No Householding" },
            ];
        }

}