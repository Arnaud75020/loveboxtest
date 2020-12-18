import React, { useState, useEffect } from 'react';
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


export default () => {
  // const [status, setStatus] = useState('WAITING');
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
        const newMessage = [...getMessages, sendMessage];
        cache.writeQuery({
          query: GET_MESSAGES,
          data: { getMessages: newMessage },
        });
      },
    });


  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(({ status: s }) => setStatus(s))
      .catch(() => setStatus('ERROR'));
  }, []);

  console.log(data.getMessages, loading);


  return (

    <div className="container">
      <div className="send-area">
        <span>New message: </span>
        <textarea onChange={({ target: { value } }) => setMessageInput(value)} placeholder="write your message here" cols="40" rows="3" />
        <button onClick={() => sendMessage({ variables: { msg: messageInput } })} type="button">Send new message</button>
      </div>
      <div className="read-area">
        <span>Read message: </span>
        {loading
          ? <div>Loading...</div>
          : (
            <div>
              {data.getMessages.map(({ id, msg, time }) => (
                <div key={id}>
                  <p>{`message: ${msg} received at ${time}`}</p>
                </div>
              ))}
            </div>
          )
}
      </div>
      <div>
        <div className="row">
          <h4>GraphQL example</h4>
          <h4
            style={{ color: status === 'OK' ? '#2ecc71' : '#e74c3c', marginLeft: 10 }}
          >
            {`API status: ${status ? 'OK' : 'ERROR'}`}
          </h4>
        </div>
        {/* <p>
          <span>Name retrieved from the cache then fetched from the server: </span>
          <span style={{ marginLeft: 10, marginRight: 10 }}>{msg}</span>
          {
              (loading)
                ? <span>Loading...</span>
                : <button onClick={() => refetch()} type="button">Refetch</button>
            }
        </p> */}
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
