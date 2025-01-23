import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { JoinCreditUnion } from './JoinCreditUnion.JoinCreditUnion';
import { MiniOao } from './MiniOao.MiniOao';
export interface AccountOpeningConfig {
    JoinCreditUnion: JoinCreditUnion;
    MiniOao: MiniOao;
}

export class AccountOpening implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'AccountOpening'
    };


            private _joinCreditUnion: JoinCreditUnion;
            get joinCreditUnion(): JoinCreditUnion {
                return this._joinCreditUnion;
            }
            set joinCreditUnion(value: JoinCreditUnion) {
                this._joinCreditUnion = value;
            }

            private _miniOao: MiniOao;
            get miniOao(): MiniOao {
                return this._miniOao;
            }
            set miniOao(value: MiniOao) {
                this._miniOao = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "AccountOpening.JoinCreditUnion", value: this._joinCreditUnion, dataType: 'joincreditunion.joincreditunion', label: "Join Credit Union" },
                { key: "AccountOpening.MiniOao", value: this._miniOao, dataType: 'minioao.minioao', label: "Mini Oao" },
            ];
        }

}