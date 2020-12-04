import express from 'express';
import apolloServer from './apolloServer';

const app = express();

app.use(express.static('dist'));

app.get('/api/status', (req, res) => {
  res.send({ status: 'OK' });
});

apolloServer.applyMiddleware({
  app,
  path: '/graphql',
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
