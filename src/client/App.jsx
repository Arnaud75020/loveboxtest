import React, { useEffect, useState } from 'react';
import './app.css';
import LoveboxImage from './lovebox.svg';

export default () => {
  const [status, setStatus] = useState(null);
  const [username, setUsername] = useState(`Guest-${Math.round(Math.random() * 10000)}`);

  useEffect(() => {
    fetch('/api/username')
      .then(res => res.json())
      .then(({ username: u }) => setUsername(u));
    fetch('/api/status')
      .then(res => res.json())
      .then(({ status: s }) => setStatus(s));
  }, []);

  return (
    <div>
      <h1>{`Hello ${username}`}</h1>
      <h1>Welcome in Lovebox Tech Interview</h1>
      <h3
        style={{ color: status === 'OK' ? '#2ecc71' : '#e74c3c' }}
      >
        {`API status: ${status || 'OFF'}`}
      </h3>
      <div style={{ textAlign: 'left' }}>
        <h2>Instructions</h2>
        <span>
          The goal is to create some sort of
          <b> virtual Lovebox</b>
          .
        </span>
        <ul>
          <li>
            The front-end is composed of 2 parts:
            <ul>
              <li>
                one that will display a textarea box where you can type love notes,
                and a send button
              </li>
              <li>one that will display all received messages</li>
            </ul>
          </li>
          <li>
            The back-end must implement some functionalities,
            including but not limited to: being able to send messages,
            being able to read messages. The back-end must implement a REST API.
            <ul>
              <li>
                <b>/api/send/ </b>
                will be the endpoint for POST requests
              </li>
              <li>
                <b>/api/messages/ </b>
                will be the endpoint for GET requests
              </li>
            </ul>
          </li>
        </ul>
        <p>
          We don&apos;t care about the persistence of the messages.
          You don&apos;t have to use any database.
        </p>
        <p>
          Recommended time: 2.5 hours
          <ul>
            <li>
              2 hours: coding time!
              <span role="img" aria-label="developer"> 🧑‍💻</span>
            </li>
            <li>
              0.5 hour: write a note with the strenghs and limitations of your code.
              What would be the next steps? What would you do if you had 2 weeks for this project?
            </li>
          </ul>
          {`Create a branch named "${username}" and push your changes to it.`}
        </p>
        <h3>
          Good luck, have fun
          <span role="img" aria-label="heart"> ❤️</span>
        </h3>
        <h4>Ressources</h4>
        <ul>
          <li><a href="https://en.reactjs.org/" target="_blank" rel="noreferrer">React</a></li>
          <li><a href="https://en.reactjs.org/docs/hooks-intro.html" target="_blank" rel="noreferrer">React hooks</a></li>
          <li><a href="https://expressjs.com/" target="_blank" rel="noreferrer">Express</a></li>
          <li><a href="https://graphql.org/" target="_blank" rel="noreferrer">GraphQL theory</a></li>
          <li><a href="https://www.apollographql.com/docs/react/" target="_blank" rel="noreferrer">Apollo + React</a></li>
        </ul>
      </div>
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
          marginTop: 30,
        }}
      />
    </div>
  );
};
