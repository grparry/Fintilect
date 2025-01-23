import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MenuItemsConfig {
    MenuItemsXml: string;
}

export class MenuItems implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MenuItems'
    };


            private _menuItemsXml: string;
            get menuItemsXml(): string {
                return this._menuItemsXml;
            }
            set menuItemsXml(value: string) {
                this._menuItemsXml = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MenuItems.MenuItemsXml", value: this._menuItemsXml, dataType: 'string', label: "Menu Items Xml" },
            ];
        }

}