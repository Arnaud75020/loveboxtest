import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoveboxImage from './lovebox.svg';

const GET_MESSAGE = gql`
  query getNewMessage {
    getNewMessage {
      message
    }
  }
`;

const SET_MESSAGE = gql`
  mutation setNewMessage($message: String!) {
    setNewMessage(message: $message) {
      message
    }
  }
`;

export default () => {

console.log(message)

  const [messageInput, setMessageInput] = useState('');
  const {
    data: { getNewMessage: { message = '<your_message>' } = {} } = {},
  } = useQuery(
    GET_MESSAGE,
    { fetchPolicy: 'cache-and-network' },
  );
  const [setNewMessage] = useMutation(SET_MESSAGE, {
    update: (cache, { data: { setNewMessage: modifiedMessage } }) => {
      cache.writeQuery({ query: GET_MESSAGE, data: { getNewMessage: modifiedMessage } });
    },
  });

  return (

    <div className="container">
      <div className="send-area">
        <span>New message: </span>
        <textarea onChange={({ target: { value } }) => setMessageInput(value)} placeholder="write your message here" cols="40" rows="3" />
        <button onClick={() => setNewMessage({ variables: { message: messageInput } })} type="button">Send message</button>
      </div>
      <div className="read-area">
        <span>Read message: </span>
        <p>{`Your message ${message}`}</p>
      </div>
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
