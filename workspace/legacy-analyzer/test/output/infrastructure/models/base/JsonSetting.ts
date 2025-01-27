import { Setting } from '@infrastructure/settings/types';

export abstract class JsonSetting<T> {
    protected abstract settingKey: string;
    protected abstract defaultValue: T;
    private _value: T;

    constructor() {
        this._value = this.defaultValue;
    }

    get value(): T {
        return this._value;
    }

    set value(val: T) {
        this._value = val;
    }

    toSetting(): Setting {
        return {
            key: this.settingKey,
            value: JSON.stringify(this._value),
            dataType: 'json'
        };
    }

    fromSetting(setting: Setting): void {
        if (setting.key !== this.settingKey) {
            throw new Error(`Invalid setting key. Expected ${this.settingKey}, got ${setting.key}`);
        }
        try {
            this._value = JSON.parse(setting.value);
        } catch (e) {
            throw new Error(`Failed to parse JSON for setting ${this.settingKey}: ${e.message}`);
        }
    }
}
