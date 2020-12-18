// const MESSAGES = [
//   {
//     content: '',
//     date: '',
//   },

// ];
const MESSAGES = [];
 
export default {
  Query: {
    getMessage: () => MESSAGES,
  },
  Mutation: {
    sendMessage: (_, { msg }) => {
      // let newID = MESSAGES.length + 1
      const newDate = new Date().toLocaleString().replace(',', '').replace(/:.. /, ' ');
      const newMessage = { msg, date: newDate };
      MESSAGES.push(newMessage);
      return newMessage;
    },
  },
};
