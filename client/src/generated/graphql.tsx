import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  validateAuth?: Maybe<Scalars['String']>;
  userbyEmail: User;
  userbyUid: User;
  getAllUser: Array<Maybe<User>>;
  getTodoByUid: Array<Todo>;
};


export type QueryUserbyEmailArgs = {
  email?: Maybe<Scalars['String']>;
};


export type QueryUserbyUidArgs = {
  uid?: Maybe<Scalars['String']>;
};


export type QueryGetTodoByUidArgs = {
  uid?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createUserIfNotExist?: Maybe<User>;
  createTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Todo;
};


export type MutationCreateUserArgs = {
  user?: Maybe<UserInput>;
};


export type MutationCreateUserIfNotExistArgs = {
  user?: Maybe<UserInput>;
};


export type MutationCreateTodoArgs = {
  todo?: Maybe<TodoInput>;
};


export type MutationUpdateTodoArgs = {
  id?: Maybe<Scalars['ID']>;
  todo?: Maybe<TodoInput>;
};


export type MutationDeleteTodoArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  todos?: Maybe<Array<Maybe<Todo>>>;
};

export type UserInput = {
  uid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export enum TodoStatus {
  Pending = 'PENDING',
  Inprogress = 'INPROGRESS',
  Completed = 'COMPLETED',
  Resolved = 'RESOLVED',
  Archived = 'ARCHIVED'
}

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  uid: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: TodoStatus;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TodoInput = {
  uid: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  status: TodoStatus;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CreateTodoMutationVariables = Exact<{
  todo?: Maybe<TodoInput>;
}>;


export type CreateTodoMutation = (
  { __typename?: 'Mutation' }
  & { createTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'uid' | 'title' | 'description' | 'status' | 'createdAt' | 'updatedAt'>
  ) }
);

export type CreateUserIfNotExistMutationVariables = Exact<{
  user: UserInput;
}>;


export type CreateUserIfNotExistMutation = (
  { __typename?: 'Mutation' }
  & { createUserIfNotExist?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'uid' | 'email' | 'name'>
  )> }
);


export const CreateTodoDocument = gql`
    mutation createTodo($todo: TodoInput) {
  createTodo(todo: $todo) {
    id
    uid
    title
    description
    status
    createdAt
    updatedAt
  }
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      todo: // value for 'todo'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, baseOptions);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const CreateUserIfNotExistDocument = gql`
    mutation createUserIfNotExist($user: UserInput!) {
  createUserIfNotExist(user: $user) {
    uid
    email
    name
  }
}
    `;
export type CreateUserIfNotExistMutationFn = Apollo.MutationFunction<CreateUserIfNotExistMutation, CreateUserIfNotExistMutationVariables>;

/**
 * __useCreateUserIfNotExistMutation__
 *
 * To run a mutation, you first call `useCreateUserIfNotExistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserIfNotExistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserIfNotExistMutation, { data, loading, error }] = useCreateUserIfNotExistMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserIfNotExistMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserIfNotExistMutation, CreateUserIfNotExistMutationVariables>) {
        return Apollo.useMutation<CreateUserIfNotExistMutation, CreateUserIfNotExistMutationVariables>(CreateUserIfNotExistDocument, baseOptions);
      }
export type CreateUserIfNotExistMutationHookResult = ReturnType<typeof useCreateUserIfNotExistMutation>;
export type CreateUserIfNotExistMutationResult = Apollo.MutationResult<CreateUserIfNotExistMutation>;
export type CreateUserIfNotExistMutationOptions = Apollo.BaseMutationOptions<CreateUserIfNotExistMutation, CreateUserIfNotExistMutationVariables>;