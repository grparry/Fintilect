import { Setting } from '@fintilect/settings';
export interface ValidSettingsConfig {
    Setting1: string;
    Setting2: number;
}


import { Setting, ISettingsGroup, ISettingsMetadata } from './interfaces';

export class ValidSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ValidSettings',
        description: 'Settings for ValidSettings',
        category: 'UserSettings'
    };

    private _setting1: string = '';
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

    get setting1(): string {
        return this._setting1;
    }

    set setting1(value: string) {
        this._setting1 = value;
        this.onSettingChanged();
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
            new Setting('setting1', this._setting1),
            new Setting('setting2', this._setting2)
        ];
    }
}