import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoveboxImage from './lovebox.svg';

const GET_MESSAGE = gql`
  query getMessage {
    getMessage {
      message
    }
  }
`;

const SET_MESSAGE = gql`
  mutation setMessage($message: String!) {
    setMessage(message: $message) {
      message
    }
  }
`;

export default () => {
  const [messageInput, setMessageInput] = useState('');
  const {
    data: { getMessage: { message = '<hi>' } = {} } = {},
    refetch,
    loading,
  } = useQuery(
    GET_MESSAGE,
    { fetchPolicy: 'cache-and-network' },
  );
  const [setMessage] = useMutation(SET_MESSAGE, {
    update: (cache, { data: { setMessage: modifiedMessage } }) => {
      cache.writeQuery({ query: GET_MESSAGE, data: { getMessage: modifiedMessage } });
    },
  });


  return (
    <div className="container">
      <div className="send-area">
        <span>New message: </span>
        <textarea onChange={({ target: { value } }) => setMessageInput(value)} placeholder="write your message here" cols="40" rows="3" />
        <button onClick={() => setMessage({ variables: { message: messageInput } })} type="button">Send message</button>
      </div>
      <div className="read-area">
        <span>Read message: </span>
        <p>{`Your message ${message}`}</p>
      </div>
      <p>
        <span>Message retrieved from the cache then fetched from the server: </span>
        <span style={{ marginLeft: 10, marginRight: 10 }}>{message}</span>
        {
              (loading)
                ? <span>Loading...</span>
                : <button onClick={() => refetch()} type="button">Refetch</button>
            }
      </p>
      <div>
        <img
          alt="lovebox"
          src={LoveboxImage}
          style={{
            backgroundColor: '#8A64FF',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 30,
            marginTop: -10,
          }}
        />
      </div>
    </div>
  );
};
