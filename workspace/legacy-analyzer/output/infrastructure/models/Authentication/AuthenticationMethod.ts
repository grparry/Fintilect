// Generated imports
import { AuthenticationMethodType } from '../AuthenticationMethodType';

export interface AuthenticationMethod {
    id: number;
    guid: string;
    name: string;
    authenticationMethodType: AuthenticationMethodType;
    minimumApplicationVersion: string;
}
