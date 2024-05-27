import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { user } from "./user";
import { tweet } from "./tweet";
import cors from "cors";
import { JwtService } from "../services/jwt";
import { GraphQlContext } from "../types/types";

export async function initServer() {
  const app = express();

  const httpServer = http.createServer(app);

  const typeDefs = `#graphql
    ${user.types}
    ${tweet.types}
    type Query {
      ${user.queries}
      ${tweet.queries}
     }
     type Mutation {
      ${tweet.mutations}
     }
`;

  const resolvers = {
    Query: {
      ...user.resolvers.queries,
      ...tweet.resolvers.queries,
    },
    Mutation: {
      ...tweet.resolvers.mutations,
    },
    ...tweet.resolvers.extraResolvers,
    ...user.resolvers.extraResolvers,
  };
  const server = new ApolloServer<GraphQlContext>({
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
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(" ")[1] || "";
        return {
          user: req.headers.authorization ? JwtService.decodeJwt(token) : null,
        };
      },
    }),
  );

  return httpServer;
}
