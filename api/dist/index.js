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
exports.util = exports.createFetchableType = exports.createFetcher = exports.DependencyManager = exports.AbstractFetcher = void 0;
var Fetcher_1 = require("./Fetcher");
Object.defineProperty(exports, "AbstractFetcher", { enumerable: true, get: function () { return Fetcher_1.AbstractFetcher; } });
var DependencyManager_1 = require("./DependencyManager");
Object.defineProperty(exports, "DependencyManager", { enumerable: true, get: function () { return DependencyManager_1.DependencyManager; } });
var FetcherProxy_1 = require("./FetcherProxy");
Object.defineProperty(exports, "createFetcher", { enumerable: true, get: function () { return FetcherProxy_1.createFetcher; } });
Object.defineProperty(exports, "createFetchableType", { enumerable: true, get: function () { return FetcherProxy_1.createFetchableType; } });
const Md5_1 = require("./util/Md5");
const NullValues_1 = require("./util/NullValues");
const immer_1 = require("immer");
exports.util = { toMd5: Md5_1.toMd5, removeNullValues: NullValues_1.removeNullValues, exceptNullValues: NullValues_1.exceptNullValues, produce: immer_1.produce };
