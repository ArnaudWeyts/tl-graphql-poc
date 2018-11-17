import { ApolloServer, gql } from 'apollo-server';
import { TLAPI } from './datasource';

import rootSchema from './Domains/rootSchema';

const server = new ApolloServer({
  schema: rootSchema,
  context: ({ req }) => {
    return { token: req.headers.authorization || '' };
  },
  dataSources: () => ({
    TLAPI: new TLAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
