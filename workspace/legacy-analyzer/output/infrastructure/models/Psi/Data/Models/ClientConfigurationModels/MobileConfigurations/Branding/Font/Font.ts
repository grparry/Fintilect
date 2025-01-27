import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { FontColor } from '@infrastructure/FontColor';
export interface FontConfig {
    FontFamily: string;
    FontColors: FontColor;
}

export class Font implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Font'
    };


            private _fontFamily: string;
            get fontFamily(): string {
                return this._fontFamily;
            }
            set fontFamily(value: string) {
                this._fontFamily = value;
            }

            private _fontColors: FontColor;
            get fontColors(): FontColor {
                return this._fontColors;
            }
            set fontColors(value: FontColor) {
                this._fontColors = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Font.FontFamily", value: this._fontFamily, dataType: 'string', label: "Font Family" },
                { key: "Font.FontColors", value: this._fontColors, dataType: 'fontcolor', label: "Font Colors" },
            ];
        }

}