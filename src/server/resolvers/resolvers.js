// Fake database
const MESSAGE = [
  { message: '<your_message>' },
];
const getNewMessage = () => MESSAGE;

export default {
  Query: {
    getNewMessage: async () => {
      const message = getNewMessage();
      return message;
    },
  },
  Mutation: {
    setNewMessage: async (_, { message }) => {
      MESSAGE = message;
      return getNewMessage();
    },
  },
};
