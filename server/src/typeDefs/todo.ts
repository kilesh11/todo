import { gql } from 'apollo-server-express';

export default gql`
    enum TodoStatus {
        PENDING
        INPROGRESS
        COMPLETED
        RESOLVED
        ARCHIVED
    }

    type Todo {
        id: String!
        uid: String!
        title: String!
        description: String
        status: TodoStatus!
        createdAt: DateTime
        updatedAt: DateTime
    }

    input TodoInput {
        uid: String!
        title: String!
        description: String
        status: TodoStatus!
    }

    extend type User {
        todos: [Todo]
    }

    extend type Query {
        todobyUid(uid: String): Todo!
    }

    extend type Mutation {
        createTodo(todo: TodoInput): Todo!
        # validateAuth: Boolean
    }
`;
