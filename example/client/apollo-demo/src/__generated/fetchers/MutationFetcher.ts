import type { AcceptableVariables, UnresolvedVariables, FieldOptions, DirectiveArgs } from 'graphql-ts-client-api';
import { Fetcher, createFetcher, createFetchableType } from 'graphql-ts-client-api';
import {DepartmentInput} from '../inputs';
import {EmployeeInput} from '../inputs';

/*
 * Any instance of this interface is immutable,
 * all the properties and functions can only be used to create new instances,
 * they cannot modify the current instance.
 * 
 * So any instance of this interface is reuseable.
 */
export interface MutationFetcher<T extends object, TVariables extends object> extends Fetcher<'Mutation', T, TVariables> {


	directive(name: string, args?: DirectiveArgs): MutationFetcher<T, TVariables>;

	invisibleDirective(name: string, args?: DirectiveArgs): MutationFetcher<T, TVariables>;


	mergeDepartment<
		X extends object, 
		XVariables extends object, 
		XAlias extends string = "mergeDepartment", 
		XDirectives extends { readonly [key: string]: DirectiveArgs } = {}
	>(
		child: Fetcher<'Department', X, XVariables>, 
		optionsConfigurer?: (
			options: FieldOptions<"mergeDepartment", {}>
		) => FieldOptions<XAlias, XDirectives>
	): MutationFetcher<
		T & (
			XDirectives extends { readonly include: any } | { readonly skip: any } ? 
				{readonly [key in XAlias]?: X} : 
				{readonly [key in XAlias]: X}
		), 
		TVariables & XVariables & MutationArgs["mergeDepartment"]
	>;

	mergeDepartment<
		XArgs extends AcceptableVariables<MutationArgs['mergeDepartment']>, 
		X extends object, 
		XVariables extends object, 
		XAlias extends string = "mergeDepartment", 
		XDirectives extends { readonly [key: string]: DirectiveArgs } = {}
	>(
		args: XArgs | undefined, 
		child: Fetcher<'Department', X, XVariables>, 
		optionsConfigurer?: (
			options: FieldOptions<"mergeDepartment", {}>
		) => FieldOptions<XAlias, XDirectives>
	): MutationFetcher<
		T & (
			XDirectives extends { readonly include: any } | { readonly skip: any } ? 
				{readonly [key in XAlias]?: X} : 
				{readonly [key in XAlias]: X}
		), 
		TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['mergeDepartment']>
	>;


	deleteDepartment<
		XAlias extends string = "deleteDepartment", 
		XDirectives extends { readonly [key: string]: DirectiveArgs } = {}
	>(
		optionsConfigurer?: (
			options: FieldOptions<"deleteDepartment", {}>
		) => FieldOptions<XAlias, XDirectives>
	): MutationFetcher<
		T & (
			XDirectives extends { readonly include: any } | { readonly skip: any } ? 
				{readonly [key in XAlias]?: string} : 
				{readonly [key in XAlias]: string}
		), 
		TVariables & MutationArgs["deleteDepartment"]
	>;

	deleteDepartment<
		XArgs extends AcceptableVariables<MutationArgs['deleteDepartment']>, 
		XAlias extends string = "deleteDepartment", 
		XDirectives extends { readonly [key: string]: DirectiveArgs } = {}
	>(
		args: XArgs | undefined, 
		optionsConfigurer?: (
			options: FieldOptions<"deleteDepartment", {}>
		) => FieldOptions<XAlias, XDirectives>
	): MutationFetcher<
		T & (
			XDirectives extends { readonly include: any } | { readonly skip: any } ? 
				{readonly [key in XAlias]?: string} : 
				{readonly [key in XAlias]: string}
		), 
		TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteDepartment']>
	>;


	mergeEmployee<
		X extends object, 
		XVariables extends object, 
		XAlias extends string = "mergeEmployee", 
		XDirectives extends { readonly [key: string]: DirectiveArgs } = {}
	>(
		child: Fetcher<'Employee', X, XVariables>, 
		optionsConfigurer?: (
			options: FieldOptions<"mergeEmployee", {}>
		) => FieldOptions<XAlias, XDirectives>
	): MutationFetcher<
		T & (
			XDirectives extends { readonly include: any } | { readonly skip: any } ? 
				{readonly [key in XAlias]?: X} : 
				{readonly [key in XAlias]: X}
		), 
		TVariables & XVariables & MutationArgs["mergeEmployee"]
	>;

	mergeEmployee<
		XArgs extends AcceptableVariables<MutationArgs['mergeEmployee']>, 
		X extends object, 
		XVariables extends object, 
		XAlias extends string = "mergeEmployee", 
		XDirectives extends { readonly [key: string]: DirectiveArgs } = {}
	>(
		args: XArgs | undefined, 
		child: Fetcher<'Employee', X, XVariables>, 
		optionsConfigurer?: (
			options: FieldOptions<"mergeEmployee", {}>
		) => FieldOptions<XAlias, XDirectives>
	): MutationFetcher<
		T & (
			XDirectives extends { readonly include: any } | { readonly skip: any } ? 
				{readonly [key in XAlias]?: X} : 
				{readonly [key in XAlias]: X}
		), 
		TVariables & XVariables & UnresolvedVariables<XArgs, MutationArgs['mergeEmployee']>
	>;


	deleteEmployee<
		XAlias extends string = "deleteEmployee", 
		XDirectives extends { readonly [key: string]: DirectiveArgs } = {}
	>(
		optionsConfigurer?: (
			options: FieldOptions<"deleteEmployee", {}>
		) => FieldOptions<XAlias, XDirectives>
	): MutationFetcher<
		T & (
			XDirectives extends { readonly include: any } | { readonly skip: any } ? 
				{readonly [key in XAlias]?: string} : 
				{readonly [key in XAlias]: string}
		), 
		TVariables & MutationArgs["deleteEmployee"]
	>;

	deleteEmployee<
		XArgs extends AcceptableVariables<MutationArgs['deleteEmployee']>, 
		XAlias extends string = "deleteEmployee", 
		XDirectives extends { readonly [key: string]: DirectiveArgs } = {}
	>(
		args: XArgs | undefined, 
		optionsConfigurer?: (
			options: FieldOptions<"deleteEmployee", {}>
		) => FieldOptions<XAlias, XDirectives>
	): MutationFetcher<
		T & (
			XDirectives extends { readonly include: any } | { readonly skip: any } ? 
				{readonly [key in XAlias]?: string} : 
				{readonly [key in XAlias]: string}
		), 
		TVariables & UnresolvedVariables<XArgs, MutationArgs['deleteEmployee']>
	>;
}

export const mutation$: MutationFetcher<{}, {}> = 
	createFetcher(
		createFetchableType(
			"Mutation", 
			[], 
			[
				{
					isFunction: true, 
					isPlural: false, 
					name: "mergeDepartment", 
					argGraphQLTypeMap: {input: 'DepartmentInput!'}
				}, 
				{
					isFunction: true, 
					isPlural: false, 
					name: "deleteDepartment", 
					argGraphQLTypeMap: {id: 'ID!'}
				}, 
				{
					isFunction: true, 
					isPlural: false, 
					name: "mergeEmployee", 
					argGraphQLTypeMap: {input: 'EmployeeInput!'}
				}, 
				{
					isFunction: true, 
					isPlural: false, 
					name: "deleteEmployee", 
					argGraphQLTypeMap: {id: 'ID!'}
				}
			]
		), 
		undefined
	)
;

interface MutationArgs {

	readonly mergeDepartment: {
		readonly input: DepartmentInput
	}, 

	readonly deleteDepartment: {
		readonly id: string
	}, 

	readonly mergeEmployee: {
		readonly input: EmployeeInput
	}, 

	readonly deleteEmployee: {
		readonly id: string
	}
}