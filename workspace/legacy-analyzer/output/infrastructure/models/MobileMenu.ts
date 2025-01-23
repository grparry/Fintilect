import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MobileMenuConfig {
    Layout: string;
}

export class MobileMenu implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MobileMenu'
    };


            private _layout: string;
            get layout(): string {
                return this._layout;
            }
            set layout(value: string) {
                this._layout = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MobileMenu.Layout", value: this._layout, dataType: 'string', label: "Layout" },
            ];
        }

}