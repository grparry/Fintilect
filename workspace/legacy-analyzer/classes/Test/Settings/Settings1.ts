import { Setting } from '@fintilect/settings';
export interface Settings1Config {
    Setting1: string;
}


import { Setting, ISettingsGroup, ISettingsMetadata } from './interfaces';

export class Settings1 implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Settings1',
        description: 'Settings for Settings1',
        category: 'UserSettings'
    };

    private _setting1: string = '';

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

    toSettings(): Setting[] {
        return [
            new Setting('setting1', this._setting1)
        ];
    }
}