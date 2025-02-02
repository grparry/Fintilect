export type ParsedClassType = 'class' | 'enum';

export interface ParsedClass {
  name: string;
  documentation?: string;
  namespace?: string;
  fields: ParsedField[];
  enums: ParsedEnum[];
  type: ParsedClassType;
  values?: ParsedEnumValue[];
  interfaces?: string[];
  attributes?: ParsedAttribute[];
  isAbstract?: boolean;
  isPublic?: boolean;
  sourceFile?: string;
  baseClass?: string;
  genericParameters?: ParsedGenericParameter[];
}

export interface ParsedField {
  name: string;
  type: string;               // Clean type name for TypeScript generation
  documentationType?: string; // Type with markdown links for documentation
  documentation?: string;
  isNullable: boolean;
  settingKey?: string;
  isReadOnly: boolean;
  isPublic: boolean;
  sourceFile?: string;
  defaultValue?: string;
  attributes: ParsedAttribute[];
  validationRules: string[];
  propertyImplementation?: {
    backingField?: {
      name: string;
      type: string;
      initialization?: string;
    };
    accessors?: {
      get?: string;
      set?: string | null;
    };
  };
}

export interface ParsedAttribute {
  name: string;
  arguments: ParsedAttributeArgument[];
}

export interface ParsedAttributeArgument {
  name?: string;
  value: string;
}

export interface ParsedEnumValue {
  name: string;
  value: string | number;
  documentation: string;
}

export interface ParsedEnum {
  name: string;
  documentation?: string;
  values: ParsedEnumValue[];
  namespace?: string;
}

export interface ParsedGenericParameter {
  name: string;
  constraints: string[];
}
