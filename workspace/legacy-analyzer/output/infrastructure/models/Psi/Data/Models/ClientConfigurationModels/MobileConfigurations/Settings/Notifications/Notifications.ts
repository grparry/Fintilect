import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Travel } from '@infrastructure/Travel';
export interface NotificationsConfig {
    Travel: Travel;
}

export class Notifications implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Notifications'
    };


            private _travel: Travel;
            get travel(): Travel {
                return this._travel;
            }
            set travel(value: Travel) {
                this._travel = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Notifications.Travel", value: this._travel, dataType: 'travel', label: "Travel" },
            ];
        }

}