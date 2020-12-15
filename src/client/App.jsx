import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './ApolloClient';
import Home from './Home';
import MyHome from './MyHome';

export default () => {
  const [client, setClient] = useState(null);
  useEffect(() => {
    const setApolloClient = async () => {
      const apolloClient = await createApolloClient();
      setClient(apolloClient);
    };
    setApolloClient();
  }, []);
  if (!client) return null;
  return (
    <ApolloProvider client={client}>
      {/* <Home /> */}
      <MyHome />
    </ApolloProvider>
  );
};
