// Fake database
const USERS = [
  { name: '<your_name>' },
];
const getUser = () => USERS[0];

export default {
  Query: {
    getUser: async () => {
      const user = getUser();
      return user;
    },
  },
  Mutation: {
    setName: async (_, { name }) => {
      USERS[0].name = name;
      return getUser();
    },
  },
};
