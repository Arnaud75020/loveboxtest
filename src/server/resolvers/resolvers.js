const MESSAGES = [
  {
    content: '',
    date: '',
  },

];

export default {
  Query: {
    getMessage: () => MESSAGES,
  },
  Mutation: {
    sendMessage: (_, { content }) => {
      // let newID = MESSAGES.length + 1
      const newDate = new Date().toLocaleString().replace(',', '').replace(/:.. /, ' ');
      const newMessage = { content, date: newDate };
      MESSAGES.push(newMessage);
      return newMessage;
    },
  },
};
