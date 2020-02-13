const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    ping: String!
  }

  type Mutation {
    slowMutation(someString: String!): String!
    singleUpload(file: Upload!): String!
  }
`;

const resolvers = {
  Query: {
    ping: () => {
      return 'ping!'
    },
  },
  Mutation: {
    slowMutation: async () => {
      return await new Promise((res) => {
        setTimeout(() => res('Wow, that took like 5 seconds'), 5000)
      })
    },
    singleUpload: (parent, args) => {
      return args.file.then(file => {
        //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        //file.stream is a node stream that contains the contents of the uploaded file
        //node stream api: https://nodejs.org/api/stream.html
        return 'Success!';
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
