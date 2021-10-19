"use strict";
/**
 * @author ChenTao
 *
 * 'graphql-ts-client' is a graphql client for TypeScript, it has two functionalities:
 *
 * 1. Supports GraphQL queries with strongly typed code
 *
 * 2. Automatically infers the type of the returned data according to the strongly typed query
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedConfigurationWriter = void 0;
const graphql_1 = require("graphql");
const Utils_1 = require("../Utils");
const Writer_1 = require("../Writer");
class TypedConfigurationWriter extends Writer_1.Writer {
    constructor(ctx, stream, config) {
        super(stream, config);
        this.ctx = ctx;
    }
    isUnderGlobalDir() {
        return true;
    }
    prepareImportings() {
        var _a;
        this.importStatement(`import { Configuration, newConfiguration } from 'graphql-state';`);
        const scalarTypeNames = [];
        const eventTypeNames = [];
        const instanceNames = [];
        for (const fetcherType of this.ctx.fetcherTypes) {
            if (!this.ctx.connectionTypes.has(fetcherType) &&
                !this.ctx.edgeTypes.has(fetcherType)) {
                if (fetcherType.name !== 'Query' && fetcherType.name !== 'Mutation') {
                    scalarTypeNames.push(`${fetcherType.name}ScalarType`);
                    eventTypeNames.push(`${fetcherType.name}ChangeEvent`);
                }
                instanceNames.push(`${Utils_1.instancePrefix(fetcherType.name)}$`);
            }
        }
        const indent = (_a = this.config.indent) !== null && _a !== void 0 ? _a : "    ";
        const separator = `,\n${indent}`;
        if (instanceNames.length !== 0) {
            this.importStatement(`import {\n${indent}${instanceNames.join(separator)}\n} from './fetchers';`);
        }
        if (this.ctx.typesWithParameterizedField.size !== 0) {
            this.importStatement(`import {\n${indent}${Array.from(this.ctx.typesWithParameterizedField)
                .filter(type => type.name !== 'Mutation')
                .map(type => `${type.name}Args`)
                .join(separator)}\n} from './fetchers';`);
        }
        if (eventTypeNames.length !== 0) {
            this.importStatement(`import {\n${indent}${scalarTypeNames.join(separator)}\n} from './fetchers';`);
        }
        if (eventTypeNames.length !== 0) {
            this.importStatement(`import {\n${indent}${eventTypeNames.join(separator)}\n} from './triggers';`);
        }
    }
    writeCode() {
        const t = this.text.bind(this);
        t("export function newTypedConfiguration(): Configuration<Schema> ");
        this.scope({ type: "BLOCK", multiLines: true, suffix: "\n" }, () => {
            t("return newConfiguration<Schema>");
            this.scope({ type: "PARAMETERS", multiLines: true, suffix: ";\n" }, () => {
                for (const fetcherType of this.ctx.fetcherTypes) {
                    this.separator(", ");
                    t(Utils_1.instancePrefix(fetcherType.name));
                    t("$");
                }
            });
        });
        this.writeSchema();
    }
    writeSchema() {
        const t = this.text.bind(this);
        t("\nexport type Schema = ");
        this.scope({ type: "BLOCK", multiLines: true, suffix: ";\n" }, () => {
            const queryType = this.ctx.fetcherTypes.find(type => type.name === 'Query');
            if (queryType !== undefined) {
                t("readonly query: ");
                this.writeFetcherType(queryType);
            }
            t("readonly entities: ");
            this.scope({ type: "BLOCK", multiLines: true, suffix: ";\n" }, () => {
                for (const fetcherType of this.ctx.fetcherTypes) {
                    if (fetcherType.name !== "Query" && fetcherType.name !== "Mutation") {
                        t(`readonly "${fetcherType.name}": `);
                        this.writeFetcherType(fetcherType);
                    }
                }
            });
        });
    }
    writeFetcherType(fetcherType) {
        if (fetcherType instanceof graphql_1.GraphQLUnionType ||
            this.ctx.connectionTypes.has(fetcherType) ||
            this.ctx.edgeTypes.has(fetcherType)) {
            return;
        }
        const t = this.text.bind(this);
        this.scope({ type: "BLOCK", multiLines: true, suffix: ";\n" }, () => {
            if (fetcherType.name !== 'Query') {
                const idField = this.ctx.idFieldMap.get(fetcherType);
                if (idField !== undefined) {
                    t(`readonly " $id": `);
                    this.typeRef(idField.type);
                    t(";\n");
                }
                t(`readonly " $event": ${fetcherType.name}ChangeEvent;\n`);
            }
            const fieldMap = fetcherType.getFields();
            const associationTypeMap = this.associationTypeMapOf(fetcherType);
            t(`readonly " $associationTypes": `);
            this.scope({ type: "BLOCK", multiLines: true, suffix: ";\n" }, () => {
                for (const [fieldName, typeName] of associationTypeMap) {
                    this.separator(", ");
                    t(`readonly ${fieldName}: "${typeName}"`);
                }
            });
            t(`readonly " $associationArgs": `);
            this.scope({ type: "BLOCK", multiLines: true, suffix: ";\n" }, () => {
                for (const fieldName in fieldMap) {
                    if (fieldMap[fieldName].args.length !== 0) {
                        this.separator(", ");
                        t(`readonly ${fieldName}: ${fetcherType.name}Args["${fieldName}"]`);
                    }
                }
            });
            t(`readonly " $associationTargetTypes": `);
            this.scope({ type: "BLOCK", multiLines: true, suffix: ";\n" }, () => {
                for (const [fieldName, typeName] of associationTypeMap) {
                    this.separator(", ");
                    t(`readonly ${fieldName}: ${typeName}ScalarType`);
                }
            });
        });
    }
    associationTypeMapOf(fetcherType) {
        const map = new Map();
        const fieldMap = fetcherType.getFields();
        for (const fieldName in fieldMap) {
            const field = fieldMap[fieldName];
            const associatedType = Utils_1.associatedTypeOf(field.type);
            if (associatedType !== undefined) {
                const connection = this.ctx.connectionTypes.get(associatedType);
                if (connection !== undefined) {
                    map.set(fieldName, connection.nodeType.name);
                }
                else {
                    map.set(fieldName, associatedType.name);
                }
            }
        }
        return map;
    }
}
exports.TypedConfigurationWriter = TypedConfigurationWriter;
