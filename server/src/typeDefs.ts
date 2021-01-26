import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        hello: String
        validateAuth: String
        userbyEmail(email: String): User!
        userbyUid(uid: String): User!
    }

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

    type Mutation {
        createUser(user: UserInput): User!
        createUserIfNotExist(user: UserInput): User
        # validateAuth: Boolean
    }
`;

export default typeDefs;
