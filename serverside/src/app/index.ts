import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { user } from "./user";

export async function initServer() {
  const app = express();

  const typeDefs = `#graphql
    ${user.types}     
  type Query {
    ${user.queries}
  }
`;

  const resolvers = {
    Query: {
      ...user.resolvers.queries,
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
