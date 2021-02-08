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


export type GetTodoByUidQueryVariables = Exact<{
  uid?: Maybe<Scalars['ID']>;
}>;


export type GetTodoByUidQuery = (
  { __typename?: 'Query' }
  & { getTodoByUid: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'uid' | 'title' | 'description' | 'status' | 'createdAt' | 'updatedAt'>
  )> }
);

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

export type UpdateTodoMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  todo?: Maybe<TodoInput>;
}>;


export type UpdateTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'uid' | 'title' | 'description' | 'status' | 'updatedAt' | 'createdAt'>
  ) }
);

export type DeleteTodoMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & { deleteTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'uid' | 'title' | 'description' | 'status' | 'updatedAt' | 'createdAt'>
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


export const GetTodoByUidDocument = gql`
    query getTodoByUid($uid: ID) {
  getTodoByUid(uid: $uid) {
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

/**
 * __useGetTodoByUidQuery__
 *
 * To run a query within a React component, call `useGetTodoByUidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodoByUidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodoByUidQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useGetTodoByUidQuery(baseOptions?: Apollo.QueryHookOptions<GetTodoByUidQuery, GetTodoByUidQueryVariables>) {
        return Apollo.useQuery<GetTodoByUidQuery, GetTodoByUidQueryVariables>(GetTodoByUidDocument, baseOptions);
      }
export function useGetTodoByUidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodoByUidQuery, GetTodoByUidQueryVariables>) {
          return Apollo.useLazyQuery<GetTodoByUidQuery, GetTodoByUidQueryVariables>(GetTodoByUidDocument, baseOptions);
        }
export type GetTodoByUidQueryHookResult = ReturnType<typeof useGetTodoByUidQuery>;
export type GetTodoByUidLazyQueryHookResult = ReturnType<typeof useGetTodoByUidLazyQuery>;
export type GetTodoByUidQueryResult = Apollo.QueryResult<GetTodoByUidQuery, GetTodoByUidQueryVariables>;
export function refetchGetTodoByUidQuery(variables?: GetTodoByUidQueryVariables) {
      return { query: GetTodoByUidDocument, variables: variables }
    }
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
export const UpdateTodoDocument = gql`
    mutation updateTodo($id: ID, $todo: TodoInput) {
  updateTodo(id: $id, todo: $todo) {
    id
    uid
    title
    description
    status
    updatedAt
    createdAt
  }
}
    `;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      todo: // value for 'todo'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, baseOptions);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation deleteTodo($id: ID) {
  deleteTodo(id: $id) {
    id
    uid
    title
    description
    status
    updatedAt
    createdAt
  }
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, baseOptions);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
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