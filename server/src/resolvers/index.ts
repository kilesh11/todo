import { mergeResolvers } from '@graphql-tools/merge';
import todoResolvers from './todo';
import userResolvers from './user';

const resolvers = [todoResolvers, userResolvers];

export default mergeResolvers(resolvers);
