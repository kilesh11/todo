import { gql } from 'apollo-server-express';
import user from './user';
import todo from './todo';

export default gql`
    scalar DateTime
    type Query
    type Mutation
    ${user}
    ${todo}
`;
