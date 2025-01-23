import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface TestClassConfig {
    items: string[];
    numbers: number[];
    children: TestClass[];
}

export class TestClass implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TestClass',
        settings: {
        }
    };


    private _items: string[];
    get items(): string[] {
        return this._items;
    }

    private _numbers: number[];
    get numbers(): number[] {
        return this._numbers;
    }

    private _children: TestClass[];
    get children(): TestClass[] {
        return this._children;
    }

    constructor() {}

    toSettings(): Setting[] {
        return [
        ];
    }

    fromSettings(settings: Setting[]): void {
        for (const setting of settings) {
            switch (setting.key) {
                case 'TestClass.':
                    this._items = setting.value;
                    break;
                case 'TestClass.':
                    this._numbers = setting.value;
                    break;
                case 'TestClass.':
                    this._children = setting.value;
                    break;
            }
        }
    }
}
