import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PscuLogFileTransformServiceSettings, FilterConfig, PathConfig } from './PscuLogFileTransformServiceSettings';

@Component({
    selector: 'app-settings-editor',
    template: `
        <form [formGroup]="filterForm" (ngSubmit)="onSubmitFilter()">
            <input formControlName="name" placeholder="Filter Name" />
            <input formControlName="valuesCausingInclusion" placeholder="Values Causing Inclusion" />
            <input formControlName="valuesCausingExclusion" placeholder="Values Causing Exclusion" />
            <input formControlName="requiresValue" type="checkbox" />
            <input formControlName="errorMessage" placeholder="Error Message" />
            <button type="submit" [disabled]="!filterForm.valid">Add Filter</button>
        </form>

        <form [formGroup]="pathForm" (ngSubmit)="onSubmitPath()">
            <input formControlName="inputPath" placeholder="Input Path" />
            <input formControlName="outputPath" placeholder="Output Path" />
            <input formControlName="errorPath" placeholder="Error Path" />
            <input formControlName="processedPath" placeholder="Processed Path" />
            <input formControlName="inputFilenamePattern" placeholder="Input Filename Pattern" />
            <input formControlName="outputFilePrefix" placeholder="Output File Prefix" />
            <input formControlName="inputFileExclusiveAccessTimeout" placeholder="Access Timeout" />
            <button type="submit" [disabled]="!pathForm.valid">Save Path Config</button>
        </form>
    `
})
export class SettingsEditorComponent implements OnInit {
    settings = new PscuLogFileTransformServiceSettings();
    filterForm: FormGroup;
    pathForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.filterForm = this.fb.group({
            name: ['', Validators.required],
            valuesCausingInclusion: [''],
            valuesCausingExclusion: [''],
            requiresValue: [false],
            errorMessage: ['']
        });

        this.pathForm = this.fb.group({
            inputPath: ['', Validators.required],
            outputPath: ['', Validators.required],
            errorPath: ['', Validators.required],
            processedPath: ['', Validators.required],
            inputFilenamePattern: ['', Validators.required],
            outputFilePrefix: [''],
            inputFileExclusiveAccessTimeout: ['00:01:00']
        });
    }

    ngOnInit() {
        // Initialize forms with current settings
        this.pathForm.patchValue(this.settings.pathConfiguration);
    }

    onSubmitFilter() {
        if (this.filterForm.valid) {
            const filter: FilterConfig = this.filterForm.value;
            this.settings.filters = [...this.settings.filters, filter];
            this.filterForm.reset();
        }
    }

    onSubmitPath() {
        if (this.pathForm.valid) {
            const pathConfig: PathConfig = this.pathForm.value;
            this.settings.pathConfiguration = pathConfig;
        }
    }
}
