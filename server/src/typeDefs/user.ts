import { gql } from 'apollo-server-express';

export default gql`
    type User {
        id: String
        uid: String
        email: String
        name: String!
    }

    input UserInput {
        uid: String
        email: String
        name: String!
    }

    extend type Query {
        hello: String
        validateAuth: String
        userbyEmail(email: String): User!
        userbyUid(uid: String): User!
        getAllUser: [User]!
    }

    extend type Mutation {
        createUser(user: UserInput): User!
        createUserIfNotExist(user: UserInput): User
        # validateAuth: Boolean
    }
`;
