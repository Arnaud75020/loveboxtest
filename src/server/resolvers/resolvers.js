// Fake database
const MESSAGES = [
  { message: '<hi>' },
];
const getMessage = () => MESSAGES[0];

export default {
  Query: {
    getMessage: async () => {
      const message = getMessage();
      return message;
    },
  },
  Mutation: {
    setMessage: async (_, { message }) => {
      MESSAGES[0].message = message;
      return getMessage();
    },
  },
};
