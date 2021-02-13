import { mergeResolvers } from '@graphql-tools/merge';
import todoResolvers from './todoResolvers';
import userResolvers from './userResolvers';

const resolvers = [todoResolvers, userResolvers];

export default mergeResolvers(resolvers);
