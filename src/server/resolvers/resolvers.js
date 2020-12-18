const MESSAGES = [];

export default {
  Query: {
    getMessages: () => MESSAGES,
  },
  Mutation: {

    sendMessage: (_, { msg }) => {
      const newId = MESSAGES.length + 1;
      const newMessage = {
        id: newId,
        time: new Date().toLocaleString().replace(',', '').replace(/:.. /, ' '),
        msg,
      };
      MESSAGES.push(newMessage);
      return newMessage;
    },
  },
};
