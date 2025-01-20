// Generated imports
import { AuthenticationMethods } from '../AuthenticationMethods';

export interface AuthenticationRule {
    list: AuthenticationMethods;
    numberOfRequiredMethods: number;
    priority: number;
    isFallback: boolean;
}
