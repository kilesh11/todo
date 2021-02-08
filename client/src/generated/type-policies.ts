import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type QueryKeySpecifier = ('hello' | 'validateAuth' | 'userbyEmail' | 'userbyUid' | 'getAllUser' | 'getTodoByUid' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	hello?: FieldPolicy<any> | FieldReadFunction<any>,
	validateAuth?: FieldPolicy<any> | FieldReadFunction<any>,
	userbyEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	userbyUid?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getTodoByUid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createUser' | 'createUserIfNotExist' | 'createTodo' | 'updateTodo' | 'deleteTodo' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	createUserIfNotExist?: FieldPolicy<any> | FieldReadFunction<any>,
	createTodo?: FieldPolicy<any> | FieldReadFunction<any>,
	updateTodo?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteTodo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'uid' | 'email' | 'name' | 'todos' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	todos?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TodoKeySpecifier = ('id' | 'uid' | 'title' | 'description' | 'status' | 'createdAt' | 'updatedAt' | TodoKeySpecifier)[];
export type TodoFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	Todo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TodoKeySpecifier | (() => undefined | TodoKeySpecifier),
		fields?: TodoFieldPolicy,
	}
};