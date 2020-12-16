import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './app.css';
import LoveboxImage from './lovebox.svg';

const GET_MESSAGE = gql`
  query getMessage {
    getMessage {
      content
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($content: String!) {
    sendMessage(content: $content) {
      content
    }
  }
`;

export default () => {
  const [status, setStatus] = useState('WAITING');
  const [messageInput, setMessageInput] = useState('');
  const {
    data: { getMessage: { content = '' } = {} } = {},
    refetch,
    loading,
  } = useQuery(
    GET_MESSAGE,
    { fetchPolicy: 'cache-and-network' },
  );
  const [setMessage] = useMutation(SEND_MESSAGE, {
    update: (cache, { data: { sendMessage: modifiedMessage } }) => {
      cache.writeQuery({ query: GET_MESSAGE, data: { getMessage: modifiedMessage } });
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
      <h1 style={{ marginTop: 0, paddingTop: 15 }}>{`Hello ${name}`}</h1>
      <h1>Welcome in Lovebox Tech Interview</h1>
      <div style={{ textAlign: 'left' }}>
        <h2>Instructions</h2>
        <span>
          The goal is to create some sort of
          <b> virtual Lovebox</b>
          <span role="img" aria-label="heart"> 💌</span>
        </span>
        <ul>
          <li>
            The front-end is composed of 2 parts:
            <ul>
              <li>
                The 1st one will display a textarea box where you can type love notes,
                and a send button.
                <br />
                The send button will call a &apos;sendMessage&apos; mutation to send
                message to the server.
              </li>
              <li>
                The 2nd one will display all received messages.
                Messages will be fetched with a &apos;getMessages&apos; query.
              </li>
            </ul>
          </li>
          <li>
            The back-end must implement some functionalities,
            including but not limited to: being able to send messages,
            being able to read messages. The back-end must implement a GraphQL API.
            <br />
            <b>/graphql </b>
            is the endpoint for all GraphQL requests. You&apos;ll have to add:
            <ul>
              <li>A &apos;sendMessage&apos; mutation, to send a text message</li>
              <li>A &apos;getMessages&apos; query, to retrieve sent messages</li>
            </ul>
          </li>
        </ul>
        <p>
          We don&apos;t care about the persistence of the messages.
          You don&apos;t have to use any database.
        </p>
        <div>
          Recommended time: 3 hours
          <ul>
            <li>
              2.5 hours: coding time!
              <span role="img" aria-label="developer"> 🧑‍💻</span>
            </li>
            <li>
              0.5 hour: write a note with the strenghs and limitations of your code.
              What would be the next steps? What would you do if you had 2 weeks for this project?
            </li>
          </ul>
          {`Zip your code in a file name ${name}.zip and send it to`}
          <span style={{ fontStyle: 'italic' }}> marhold@lovebox.love</span>
          . Add
          <span style={{ fontStyle: 'italic' }}> benjamin@lovebox.love </span>
          in CC.
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
            <span style={{ marginLeft: 10, marginRight: 10 }}>{name}</span>
            {
              (loading)
                ? <span>Loading...</span>
                : <button onClick={() => refetch()} type="button">Refetch</button>
            }
          </p>
          <div>
            <span>New name: </span>
            <input onChange={({ target: { value } }) => setMessageInput(value)} />
            <button onClick={() => setMessage({ variables: { content: messageInput } })} type="button">Set message</button>
          </div>
        </div>
        <div>
          <h4>Ressources</h4>
          <ul>
            <li><a href="https://en.reactjs.org/" target="_blank" rel="noreferrer">React</a></li>
            <li><a href="https://en.reactjs.org/docs/hooks-intro.html" target="_blank" rel="noreferrer">React hooks</a></li>
            <li><a href="https://expressjs.com/" target="_blank" rel="noreferrer">Express</a></li>
            <li><a href="https://graphql.org/" target="_blank" rel="noreferrer">GraphQL theory</a></li>
            <li><a href="https://www.apollographql.com/docs/react/" target="_blank" rel="noreferrer">Apollo + React</a></li>
          </ul>
        </div>
      </div>
      <h2>
        Good luck, have fun
        <span role="img" aria-label="heart"> ❤️</span>
      </h2>
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
  );
};
