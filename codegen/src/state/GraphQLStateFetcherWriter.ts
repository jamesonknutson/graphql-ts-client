import { GraphQLInterfaceType, GraphQLNonNull, GraphQLObjectType, GraphQLUnionType } from "graphql";
import { FetcherWriter } from "../FetcherWriter";
import { associatedTypeOf } from "../Utils";

export class GraphQLStateFetcherWriter extends FetcherWriter {

    protected importedNamesForSuperType(superType: GraphQLObjectType | GraphQLInterfaceType | GraphQLUnionType): string[] {
        return [
            ...super.importedNamesForSuperType(superType),
            `${superType.name}ScalarType`,
            `${superType.name}FlatType`
        ];
    }

    protected writeCode() {
        super.writeCode();
        if (this.modelType.name !== "Query" && this.modelType.name !== "Mutation") {
            this.writeScalarType();
            this.writeFlatType();
        }
    }

    private writeScalarType() {

        const t = this.text.bind(this);

        t(`\nexport interface ${this.modelType.name}ScalarType`);
        
        const superTypes = this.ctx.inheritanceInfo.upcastTypeMap.get(this.modelType);
        if (superTypes !== undefined && superTypes.size !== 0) {
            t(' extends ');
            this.scope({type: "BLANK"}, () => {
                for (const superType of superTypes) {
                    this.separator(", ");
                    t(`${superType.name}ScalarType`);
                }
            });
        }

        this.scope({type: "BLOCK", multiLines: true, prefix: " ", suffix: "\n"}, () => {
            if (this.modelType instanceof GraphQLObjectType || this.modelType instanceof GraphQLInterfaceType) {
                const fieldMap = this.modelType.getFields();
                for (const fieldName of this.declaredFieldNames) {
                    const field = fieldMap[fieldName]!;
                    if (associatedTypeOf(field.type) === undefined) {
                        t("readonly ");
                        t(fieldName);
                        if (!(field.type instanceof GraphQLNonNull)) {
                            t("?");
                        }
                        t(": ");
                        this.typeRef(field.type);
                        t(";\n");
                    }
                }
            }            
        });
    }

    private writeFlatType() {

        const t = this.text.bind(this);

        t(`\nexport interface ${this.modelType.name}FlatType extends ${this.modelType.name}ScalarType`);
        
        const superTypes = this.ctx.inheritanceInfo.upcastTypeMap.get(this.modelType);
        if (superTypes !== undefined && superTypes.size !== 0) {
            for (const superType of superTypes) {
                this.separator(", ");
                t(`${superType.name}FlatType`);
            }
        }

        this.scope({type: "BLOCK", multiLines: true, prefix: " ", suffix: "\n"}, () => {
            if (this.modelType instanceof GraphQLObjectType || this.modelType instanceof GraphQLInterfaceType) {
                const fieldMap = this.modelType.getFields();
                for (const fieldName of this.declaredFieldNames) {
                    const field = fieldMap[fieldName]!;
                    const assocaitionType = associatedTypeOf(field.type);
                    if (assocaitionType !== undefined) {
                        const idField = this.ctx.idFieldMap.get(assocaitionType);
                        if (idField !== undefined) {
                            t("readonly ");
                            t(fieldName);
                            if (!(field.type instanceof GraphQLNonNull)) {
                                t("?");
                            }
                            t(": ");
                            this.typeRef(field.type, (type, field) => {
                                if (type === assocaitionType) {
                                    return field.name === idField.name;
                                }
                                return true;
                            });
                        }
                        t(";\n");
                    }
                }
            }            
        });
    }
}
