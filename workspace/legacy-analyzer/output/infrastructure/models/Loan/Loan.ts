// Generated imports
import { LoanApplication } from '../MobileConfigurations/Loan/Applications/LoanApplication';
import { LoanCalculator } from '../MobileConfigurations/Loan/Calculators/LoanCalculator';
import { LoanPayment } from '../LoanPayment';

export interface Loan {
    loanApplication: LoanApplication;
    loanCalculator: LoanCalculator;
    loanPayment: LoanPayment;
}
