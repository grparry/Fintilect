import { Setting } from '@fintilect/settings';
export interface Settings2Config {
    Setting2: number;
}


import { Setting, ISettingsGroup, ISettingsMetadata } from '@/interfaces';

export class Settings2 implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Settings2',
        description: 'Settings for Settings2',
        category: 'UserSettings'
    };

    private _setting2: number = 0;

    constructor() {
        this.initializeDefaults();
    }

    private initializeDefaults(): void {
        // Initialize default values if needed
    }

    private onSettingChanged(): void {
        // Handle setting changes
    }

    get setting2(): number {
        return this._setting2;
    }

    set setting2(value: number) {
        this._setting2 = value;
        this.onSettingChanged();
    }

    toSettings(): Setting[] {
        return [
            new Setting('setting2', this._setting2)
        ];
    }
}