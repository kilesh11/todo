import { mergeResolvers } from '@graphql-tools/merge';
import todoResolvers from './todo';
import userResolvers from './uer';

const resolvers = [todoResolvers, userResolvers];

export default mergeResolvers(resolvers);
