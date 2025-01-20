// Generated imports
import { ActionType } from '../ActionType';
import { AuthenticationRules } from '../AuthenticationRules';

export interface FeatureAction {
    actionId: number;
    guid: string;
    name: string;
    minimumApplicationVersion: string;
    clientConfigurationRepository: ActionType;
    list: AuthenticationRules;
    isLoginAction: boolean;
}
