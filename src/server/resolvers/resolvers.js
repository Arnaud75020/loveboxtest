let MESSAGES = [];

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
        isRed: false,
      };
      MESSAGES.push(newMessage);
      return newMessage;
    },
    updateStatus: (_, { id }) => {
      const messToUpdate = MESSAGES.find(mes => mes.id === id);
      messToUpdate.isRed = true;
      return messToUpdate;
    },
  },
};
