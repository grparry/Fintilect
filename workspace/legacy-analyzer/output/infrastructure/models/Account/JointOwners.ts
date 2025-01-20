// Generated imports
import { AssociationCodesToShow[] } from '../AssociationCodesToShow[]';

export interface JointOwners {
    /** @settingKey JointOwners.JointOwnersEnabled */
    enabled: boolean;
    /** @settingKey JointOwners.MinVersion */
    minVersion: number;
    /** @settingKey JointOwners.ShowJointOwners */
    shouldShowJointOwners: boolean;
    /** @settingKey JointOwners.AssociationCodesToShow */
    /**
     * /// <summary>
     * /// /// <summary>
     * /// /// Only show Joint Owners with an association code in the list
     * /// /// </summary>
     * /// /// <remarks>A comma separated list of "AssociationCodes" for Joint Owners.
     * /// /// JO = Joint Owner
     * /// /// BE = Beneficiary</remarks>
     * /// </summary>
     */
    associationCodesToShow: AssociationCodesToShow[];
}
