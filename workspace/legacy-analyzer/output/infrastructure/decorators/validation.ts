/**
 * Common validation decorators that mirror C# System.ComponentModel.DataAnnotations
 */

/**
 * Specifies that a data field value is required.
 */
export function Required(message?: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__validations) {
                instance.__validations = {};
            }
            instance.__validations[context.name.toString()] = {
                ...instance.__validations[context.name.toString()],
                required: { message: message || `${context.name.toString()} is required` }
            };
        });
    };
}

/**
 * Specifies the numeric range constraints for the value of a data field.
 */
export function Range(min: number, max: number, message?: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__validations) {
                instance.__validations = {};
            }
            instance.__validations[context.name.toString()] = {
                ...instance.__validations[context.name.toString()],
                range: { min, max, message: message || `${context.name.toString()} must be between ${min} and ${max}` }
            };
        });
    };
}

/**
 * Specifies the maximum length of array or string data.
 */
export function MaxLength(length: number, message?: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__validations) {
                instance.__validations = {};
            }
            instance.__validations[context.name.toString()] = {
                ...instance.__validations[context.name.toString()],
                maxLength: { length, message: message || `${context.name.toString()} cannot be longer than ${length} characters` }
            };
        });
    };
}

/**
 * Specifies the minimum length of array or string data.
 */
export function MinLength(length: number, message?: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__validations) {
                instance.__validations = {};
            }
            instance.__validations[context.name.toString()] = {
                ...instance.__validations[context.name.toString()],
                minLength: { length, message: message || `${context.name.toString()} must be at least ${length} characters long` }
            };
        });
    };
}

/**
 * Specifies that a data field value matches a regular expression pattern.
 */
export function RegularExpression(pattern: string, message?: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__validations) {
                instance.__validations = {};
            }
            instance.__validations[context.name.toString()] = {
                ...instance.__validations[context.name.toString()],
                pattern: { regex: pattern, message: message || `${context.name.toString()} does not match the required pattern` }
            };
        });
    };
}

/**
 * Specifies the type of data field.
 */
export enum DataType {
    EmailAddress = 'email',
    Password = 'password',
    PhoneNumber = 'phone',
    Url = 'url',
    Date = 'date',
    Time = 'time',
    DateTime = 'datetime',
    Duration = 'duration',
    PostalCode = 'postalcode',
    Currency = 'currency'
}

export function DataTypeAttribute(dataType: DataType, message?: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__validations) {
                instance.__validations = {};
            }
            instance.__validations[context.name.toString()] = {
                ...instance.__validations[context.name.toString()],
                dataType: { type: dataType, message: message || `${context.name.toString()} is not a valid ${dataType}` }
            };
        });
    };
}

/**
 * Specifies that the value of a property should match the value of another property.
 */
export function Compare(otherProperty: string, message?: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__validations) {
                instance.__validations = {};
            }
            instance.__validations[context.name.toString()] = {
                ...instance.__validations[context.name.toString()],
                compare: { property: otherProperty, message: message || `${context.name.toString()} does not match ${otherProperty}` }
            };
        });
    };
}

/**
 * Provides a text description for a property.
 */
export function Display(name: string, description?: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__display) {
                instance.__display = {};
            }
            instance.__display[context.name.toString()] = { name, description };
        });
    };
}
