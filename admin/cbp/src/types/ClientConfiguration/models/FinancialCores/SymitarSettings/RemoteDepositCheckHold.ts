import { Setting } from '@/types/ClientConfiguration/base/types';

export class RemoteDepositCheckHold {
    private _settings: Setting[] = [];

    toSettings(): Setting[] {
        return this._settings;
    }

    fromSettings(settings: Setting[]): void {
        this._settings = settings;
    }
}
