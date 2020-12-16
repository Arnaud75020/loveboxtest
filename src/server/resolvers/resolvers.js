// Fake database
const MESSAGES = [
  {
    content: '',
  },

];
const getMessage = () => MESSAGES[0];


export default {
  Query: {
    getMessage: async () => {
      const content = getMessage();
      return content;
    },
  },
  Mutation: {
    sendMessage: async (_, { content }) => {
      MESSAGES[0].content = content;
      return getMessage();
    },
  },
};
