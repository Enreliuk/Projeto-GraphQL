const graphql = require("graphql");
var _ = require("lodash");

//dummy data
var usersData = [
  { id: "1", name: "Bond", age: 36 },
  { id: "13", name: "Anna", age: 26 },
  { id: "211", name: "Bella", age: 16 },
  { id: "19", name: "Gina", age: 26 },
  { id: "150", name: "Georgina", age: 36 },
];

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

//Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        return _.find(usersData, { id: args.id });

        //we resolve with data
        //get and return data from a datasource
      },
    },
  },
});
/*
    {
        user(id: '1') {
            name
        }
    }
*/

module.exports = new GraphQLSchema({
  query: RootQuery,
});
