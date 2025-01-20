import { JsonSetting } from '../base/JsonSetting';
import { FilterConfig, InputFieldConfig, OutputFieldConfig, PathConfig } from './PscuLogFileTransformServiceSettings';

export class PscuFiltersSetting extends JsonSetting<FilterConfig[]> {
    protected settingKey = 'PsiServices.PscuLogFileTransformService.Filters';
    protected defaultValue: FilterConfig[] = [];
}

export class PscuInputFieldsSetting extends JsonSetting<InputFieldConfig[]> {
    protected settingKey = 'PsiServices.PscuLogFileTransformService.InputFileFields';
    protected defaultValue: InputFieldConfig[] = [];
}

export class PscuOutputFieldsSetting extends JsonSetting<OutputFieldConfig[]> {
    protected settingKey = 'PsiServices.PscuLogFileTransformService.OutputFileFields';
    protected defaultValue: OutputFieldConfig[] = [];
}

export class PscuPathsSetting extends JsonSetting<PathConfig> {
    protected settingKey = 'PsiServices.PscuLogFileTransformService.Paths';
    protected defaultValue: PathConfig = {
        InputPath: '',
        InputFilenamePattern: '',
        OutputPath: '',
        ErrorPath: '',
        ProcessedPath: '',
        CompletedPath: '',
        OutputFilePrefix: '',
        InputFileExclusiveAccessTimeout: '00:01:00'
    };
}
