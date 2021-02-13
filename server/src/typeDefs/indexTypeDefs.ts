import { gql } from 'apollo-server-express';
import user from './userTypeDefs';
import todo from './todoTypeDefs';

export default gql`
    scalar DateTime
    type Query
    type Mutation
    ${user}
    ${todo}
`;
