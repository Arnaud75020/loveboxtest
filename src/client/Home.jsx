/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoveboxImage from './lovebox.svg';
import './app.css';


const GET_MESSAGES = gql`
  query getMessages {
    getMessages {
      id
      time
      msg
      isRed
    }
  }
`;


const SEND_MESSAGE = gql`
  mutation sendMessage($msg: String!) {
    sendMessage(msg: $msg) {
      msg
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation updateStatus($id: Int! $time: LocalDateTime! $msg: String! $isRed: Boolean! ) {
    updateStatus(id: $id time: $time msg: $msg isRed: $isRed ) {
      id
      time
      msg
      isRed
    }
  }
`;

export default () => {
  const [messageInput, setMessageInput] = useState('');

  const {
    data,
    loading,
  } = useQuery(
    GET_MESSAGES,
    { fetchPolicy: 'cache-and-network' },
  );

  const [sendMessage] = useMutation(SEND_MESSAGE,
    {
      update: (cache, { data: sendMessage }) => {
        const { getMessages } = cache.readQuery({
          query: GET_MESSAGES,
        });
        const newList = [...getMessages, sendMessage];
        cache.writeQuery({
          query: GET_MESSAGES,
          data: { getMessages: newList },
        });
      },
    });

  const [updateStatus] = useMutation(UPDATE_STATUS);

  const resetInput = () => {
    document.getElementById('input').value = '';
    setMessageInput('');
  };

  return (

    <div className="container">
      <div className="send-area">
        <span className="title">Send message</span>
        <textarea id="input" onChange={({ target: { value } }) => setMessageInput(value)} onFocus="this.value=''" placeholder="write your message here" cols="40" rows="2" />
        <div className="button-wrapper">
          <button onClick={() => resetInput()} type="button">New</button>
          <button onClick={() => ((messageInput) ? sendMessage({ variables: { msg: messageInput } }) : null)} type="button">Send</button>
        </div>
      </div>
      <div className="read-area">
        <span className="title">Read message</span>
        <div className="message-area">
          {loading
            ? <div>Loading...</div>
            : (
              <ul className="list">
                {
              data.getMessages.map(({
                id, msg, time, isRed,
              }) => (
                <div>
                  <li
                    key={id}
                    style={{ display: isRed ? 'none' : 'inline-block', color: 'green' }}
                  >
                    {`message: ${msg} received at ${time}`}
                    <button
                      className="delete-btn"
                      onClick={() => {
                        updateStatus({
                          variables: {
                            id, time, msg, isRed,
                          },
                        });
                      }}
                    >
                      {isRed ? '' : 'x'}
                    </button>
                  </li>
                </div>
              ))}
              </ul>
            )
}
        </div>
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
