"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerEventWiter = void 0;
const Writer_1 = require("../Writer");
class TriggerEventWiter extends Writer_1.Writer {
    constructor(modelType, idField, stream, config) {
        super(stream, config);
        this.modelType = modelType;
        this.idField = idField;
        const simpleFieldNames = new Set();
        const parameterizedFieldNames = new Set();
        const fieldMap = modelType.getFields();
        for (const fieldName in fieldMap) {
            if (fieldName !== (idField === null || idField === void 0 ? void 0 : idField.name)) {
                if (fieldMap[fieldName].args.length === 0) {
                    simpleFieldNames.add(fieldName);
                }
                else {
                    parameterizedFieldNames.add(fieldName);
                }
            }
        }
        this.simpleFieldNames = simpleFieldNames;
        this.parameterizedFieldNames = parameterizedFieldNames;
    }
    prepareImportings() {
        this.importStatement(`import {ImplementationType} from '../CommonTypes';`);
        this.importStatement(`import {${[
            this.parameterizedFieldNames.size !== 0 ?
                `${this.modelType.name}Args` :
                undefined,
            `${this.modelType.name}FlatType`
        ]
            .filter(text => text !== undefined)
            .join(", ")}} from '../fetchers/${this.modelType.name}Fetcher';`);
    }
    writeCode() {
        const t = this.text.bind(this);
        t(`export interface ${this.modelType}ChangeEvent `);
        this.scope({ type: "BLOCK", multiLines: true, suffix: "\n" }, () => {
            t(`\nreadonly typeName: ImplementationType<"${this.modelType.name}">;\n`);
            if (this.idField !== undefined) {
                t(`\n readonly id: `);
                this.typeRef(this.idField.type);
                t(`;\n`);
            }
            if (this.modelType.name !== "Query") {
                t(`\nreadonly changedType: "INSERT" | "UPDATE" | "DELETE";\n`);
            }
            t(`\nreadonly changedKeys: ReadonlyArray<${this.modelType.name}ChangeEventKey<any>>;\n`);
            for (const prefix of ["old", "new"]) {
                if (this.simpleFieldNames.size !== 0) {
                    t(`\n${prefix}Value<TFieldName extends ${this.modelType.name}ChangeEventFields>`);
                    this.scope({ type: "PARAMETERS", multiLines: true }, () => {
                        t(`key: ${this.modelType.name}ChangeEventKey<TFieldName>`);
                    });
                    t(`: ${this.modelType.name}FlatType[TFieldName] | undefined;\n`);
                }
            }
        });
        this.writeEventKey();
        this.writeEventFieldNames();
    }
    writeEventKey() {
        const t = this.text.bind(this);
        t(`\nexport type ${this.modelType}ChangeEventKey<TFieldName extends ${this.modelType}ChangeEventFields> = `);
        this.scope({ type: "BLANK", multiLines: true, suffix: ";\n" }, () => {
            for (const fieldName of this.parameterizedFieldNames) {
                t(`TFieldName extends "${fieldName}" ? \n`);
                t(`{ readonly name: "${fieldName}"; readonly variables: ${this.modelType.name}Args } : \n`);
            }
            t('TFieldName\n');
        });
    }
    writeEventFieldNames() {
        const t = this.text.bind(this);
        t(`\nexport type ${this.modelType}ChangeEventFields = `);
        this.scope({ type: "BLANK", multiLines: true, suffix: ";\n" }, () => {
            for (const fieldName of this.simpleFieldNames) {
                this.separator(" | ");
                t(`"${fieldName}"`);
            }
            for (const fieldName of this.parameterizedFieldNames) {
                this.separator(" | ");
                t(`"${fieldName}"`);
            }
        });
    }
}
exports.TriggerEventWiter = TriggerEventWiter;
