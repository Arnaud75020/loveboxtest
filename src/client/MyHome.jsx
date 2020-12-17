import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoveboxImage from './lovebox.svg';
import './app.css';


const GET_MESSAGE = gql`
  query getMessage {
    getMessage {
      content
      date
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($content: String!, $date: LocalDateTime) {
    sendMessage(content: $content, date: $date) {
      content
      date
    }
  }
`;

export default () => {
  const [status, setStatus] = useState('WAITING');
  const [messageInput, setMessageInput] = useState('');
  const {
    data: { getMessage: { content = '', date = '' } = {} },
    refetch,
    loading,
  } = useQuery(
    GET_MESSAGE,
    { fetchPolicy: 'cache-and-network' },
  );
  // const [setMessage] = useMutation(SEND_MESSAGE, {
  //   update: (cache, { data: { sendMessage: modifiedMessage } }) => {
  //     cache.writeQuery({ query: GET_MESSAGE, data: { getMessage: modifiedMessage } });
  //   },
  // });
  const [setMessage] = useMutation(SEND_MESSAGE, {
    update: (cache, { data: sendMessage }) => {
      const { getMessage } = cache.readQuery({
        query: GET_MESSAGE,
      });
      const newMessage = [...getMessage, sendMessage];
      cache.writeQuery({
        query: GET_MESSAGE,
        data: { getMessage: newMessage },
      });
    },
  });

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(({ status: s }) => setStatus(s))
      .catch(() => setStatus('ERROR'));
  }, []);


  return (

    <div className="container">
      <div className="send-area">
        <span>New message: </span>
        <textarea onChange={({ target: { value } }) => setMessageInput(value)} placeholder="write your message here" cols="40" rows="3" />
        <button onClick={() => setMessage({ variables: { content: messageInput } })} type="button">Send new message</button>
      </div>
      <div className="read-area">
        <span>Read message: </span>
        <p>{`Your message: "${content}" received at "${date}"`}</p>
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
        <p>
          <span>Name retrieved from the cache then fetched from the server: </span>
          <span style={{ marginLeft: 10, marginRight: 10 }}>{content}</span>
          {
              (loading)
                ? <span>Loading...</span>
                : <button onClick={() => refetch()} type="button">Refetch</button>
            }
        </p>
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
