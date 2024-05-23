import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

export async function initServer() {
  const app = express();
  const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

  const resolvers = {
    Query: {
      books: () => books,
    },
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  app.use("/graphql", express.json(), expressMiddleware(server));
  return app;
}

const books = [
  {
    title: "acbe",
    author: "asasd",
  },
  {
    title: "acbe",
    author: "asasd",
  },
];
