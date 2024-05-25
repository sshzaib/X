import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { user } from "./user";
import cors from "cors";
import { contextType } from "../types/types";

export async function initServer() {
  const app = express();

  const httpServer = http.createServer(app);

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
  const server = new ApolloServer<contextType>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    }),
  );

  return httpServer;
}
