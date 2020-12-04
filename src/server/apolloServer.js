import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import resolvers from './resolvers/resolvers';

const schema = loadSchemaSync(__dirname.concat('/schema/schema.graphql'), { loaders: [new GraphQLFileLoader()] });

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

export default new ApolloServer({ schema: schemaWithResolvers, graphiql: true });
