/**
 * @author ChenTao
 *
 * 'graphql-ts-client' is a graphql client for TypeScript, it has two functionalities:
 *
 * 1. Supports GraphQL queries with strongly typed code
 *
 * 2. Automatically infers the type of the returned data according to the strongly typed query
 */
import { GraphQLSchema } from "graphql";
import { Generator } from "../Generator";
import { GeneratorConfig } from "../GeneratorConfig";
export declare class AsyncGenerator extends Generator {
    constructor(config: GeneratorConfig);
    protected generateServices(_: GraphQLSchema, promises: Promise<void>[]): Promise<void>;
    private generateAsync;
}
