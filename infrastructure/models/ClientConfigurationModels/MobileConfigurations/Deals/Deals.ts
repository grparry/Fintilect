import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Cardlytics } from '../Cardlytics.Cardlytics';
import { RelevantSolutions } from '../RelevantSolutions.RelevantSolutions';
import { CheckingRewards } from '../CheckingRewards.CheckingRewards';
export interface DealsConfig {
    Cardlytics: Cardlytics;
    RelevantSolutions: RelevantSolutions;
    CheckingRewards: CheckingRewards;
}

export class Deals implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Deals'
    };


            private _cardlytics: Cardlytics;
            get cardlytics(): Cardlytics {
                return this._cardlytics;
            }
            set cardlytics(value: Cardlytics) {
                this._cardlytics = value;
            }

            private _relevantSolutions: RelevantSolutions;
            get relevantSolutions(): RelevantSolutions {
                return this._relevantSolutions;
            }
            set relevantSolutions(value: RelevantSolutions) {
                this._relevantSolutions = value;
            }

            private _checkingRewards: CheckingRewards;
            get checkingRewards(): CheckingRewards {
                return this._checkingRewards;
            }
            set checkingRewards(value: CheckingRewards) {
                this._checkingRewards = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Deals.Cardlytics", value: this._cardlytics, dataType: 'cardlytics.cardlytics', label: "Cardlytics" },
                { key: "Deals.RelevantSolutions", value: this._relevantSolutions, dataType: 'relevantsolutions.relevantsolutions', label: "Relevant Solutions" },
                { key: "Deals.CheckingRewards", value: this._checkingRewards, dataType: 'checkingrewards.checkingrewards', label: "Checking Rewards" },
            ];
        }

}