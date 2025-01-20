/**
 * Decorator that associates a configuration setting key with a class property.
 * This decorator adds metadata to track the mapping between properties and their setting keys.
 * 
 * @param key The configuration setting key to associate with the property
 */
export function SettingKey(key: string) {
    return function(target: undefined, context: ClassFieldDecoratorContext) {
        context.addInitializer(function() {
            const instance = this as any;
            if (!instance.__metadata) {
                instance.__metadata = {};
            }
            instance.__metadata[context.name.toString()] = key;
        });
    };
}
