import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

export default async () => {
  const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql' });
  const cache = new InMemoryCache();
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
  const client = new ApolloClient({ cache, link: httpLink });
  return client;
};
