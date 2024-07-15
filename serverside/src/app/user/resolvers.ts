import { prisma } from "../../clients/db";
import { JwtService } from "../../services/jwt";
import { GraphQlContext, JWTUser } from "../../types/types";
import { User } from "@prisma/client";
import UserService from "../../services/user";

const queries = {
  GoogleVarification: async (_: any, { token }: { token: string }) => {
    UserService.verifyGoogleAuthToken(token);
  },
  getCurrentUser: async (parent: any, args: any, context: GraphQlContext) => {
    UserService.getCurrentUser(context.user?.email as string);
  },
  getUserByUsername: async (
    parent: any,
    { username }: { username: string },
  ) => {
    UserService.getUserByUsername(username);
  },
};
const extraResolvers = {
  User: {
    tweets(parent: User) {
      const tweets = prisma.tweet.findMany({
        where: {
          authorId: parent.id,
        },
      });
      return tweets;
    },
  },
};
export const resolvers = { queries, extraResolvers };
