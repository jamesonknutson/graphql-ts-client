"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsWrapperTypeName = exports.OperationWriter = void 0;
const graphql_1 = require("graphql");
const Associations_1 = require("./Associations");
const FetcherWriter_1 = require("./FetcherWriter");
const Writer_1 = require("./Writer");
class OperationWriter extends Writer_1.Writer {
    constructor(mutation, field, stream, config) {
        super(stream, config);
        this.mutation = mutation;
        this.field = field;
        this.argsWrapperName = argsWrapperTypeName(field);
        this.associatedTypes = Associations_1.associatedTypesOf(this.field.type);
    }
    prepareImportings() {
        this.importStatement("import {graphQLClient} from '../GraphQLClient';");
        this.importFieldTypes(this.field);
    }
    writeCode() {
        const t = this.text.bind(this);
        t("export async function ");
        t(this.field.name);
        if (this.associatedTypes.length !== 0) {
            t("<X>");
        }
        this.enter("PARAMETERS");
        if (this.field.args.length !== 0) {
            this.separator(", ");
            if (this.argsWrapperName !== undefined) {
                t("args: ");
                t(this.argsWrapperName);
            }
            else {
                const arg = this.field.args[0];
                t(arg.name);
                if (!(arg.type instanceof graphql_1.GraphQLNonNull)) {
                    t("?");
                }
                t(": ");
                this.typeRef(arg.type);
            }
        }
        if (this.associatedTypes.length !== 0) {
            this.separator(", ");
            t("fetcher: ");
            this.enter("BLANK");
            for (const associatedType of this.associatedTypes) {
                this.separator(" | ");
                t(FetcherWriter_1.generatedFetcherTypeName(associatedType, this.config));
                t("<X>");
            }
            this.leave();
        }
        this.leave();
        t(": Promise<");
        if (this.associatedTypes.length !== 0) {
            t("X");
        }
        else {
            this.typeRef(this.field.type);
        }
        t("> ");
        this.enter("BLOCK", true);
        this.writeGQL();
        t("return await graphQLClient().request(gql");
        if (this.field.args.length !== 0) {
            t(", ");
            if (this.argsWrapperName !== undefined) {
                t("args");
            }
            else {
                const arg = this.field.args[0];
                t("{");
                t(arg.name);
                t("}");
            }
        }
        t(") as ");
        if (this.associatedTypes.length !== 0) {
            t("X");
        }
        else {
            this.typeRef(this.field.type);
        }
        t(";");
        this.leave("\n");
        t("\n");
        if (this.argsWrapperName !== undefined) {
            this.writeArgsWrapperType();
        }
    }
    writeArgsWrapperType() {
        const t = this.text.bind(this);
        const name = this.argsWrapperName;
        t("export interface ");
        t(name);
        t(" ");
        this.enter("BLOCK");
        this.leave("\n");
    }
    writeGQL() {
        const t = this.text.bind(this);
        const args = this.field.args;
        t("const gql = ");
        this.enter("BLANK", true, "`");
        t(this.mutation ? "mutation" : "query");
        t(" ");
        if (args.length !== 0) {
            this.enter("PARAMETERS", args.length > 2);
            for (const arg of args) {
                this.separator(", ");
                t("$");
                t(arg.name);
                t(": ");
                this.writeGQLTypeRef(arg.type);
            }
            this.leave();
        }
        this.enter("BLOCK", true);
        t(this.field.name);
        if (args.length !== 0) {
            this.enter("PARAMETERS", args.length > 2);
            for (const arg of args) {
                this.separator(", ");
                t(arg.name);
                t(": $");
                t(arg.name);
            }
            this.leave();
        }
        if (this.associatedTypes.length !== 0) {
            t(" ");
            t("${fetcher.toString()}");
        }
        this.leave("\n");
        this.leave("`;\n");
    }
    writeGQLTypeRef(type) {
        if (type instanceof graphql_1.GraphQLNonNull) {
            this.writeGQLTypeRef(type.ofType);
            this.text("!");
        }
        else if (type instanceof graphql_1.GraphQLList) {
            this.text("[");
            this.writeGQLTypeRef(type.ofType);
            this.text("]");
        }
        else if (type instanceof graphql_1.GraphQLUnionType) {
            this.enter("BLANK");
            for (const itemType of type.getTypes()) {
                this.separator(" | ");
                this.text(itemType.name);
            }
            this.leave();
        }
        else {
            this.text(type.name);
        }
    }
}
exports.OperationWriter = OperationWriter;
function argsWrapperTypeName(field) {
    if (field.args.length < 2) {
        return undefined;
    }
    const name = field.name;
    return (`${name.substring(0, 1).toUpperCase()}${name.substring(1)}Args`);
}
exports.argsWrapperTypeName = argsWrapperTypeName;
