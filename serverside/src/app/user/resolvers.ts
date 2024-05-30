import { jwtDecode } from "jwt-decode";
import { prisma } from "../../clients/db";
import { JwtService } from "../../services/jwt";
import { GraphQlContext, JWTUser } from "../../types/types";
import { User } from "@prisma/client";

interface googleDecodeResult {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_varified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}
const queries = {
  GoogleVarification: async (_: any, { token }: { token: string }) => {
    const googleToken = token;
    const decode = jwtDecode<googleDecodeResult>(googleToken);
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          email: decode.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
    if (!user) {
      let isUsername = true;
      let username;
      do {
        username = `${decode.given_name}${Math.floor(Math.random() * (200000 - 100000) + 100000)}`;
        const usernameExists = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (!usernameExists) {
          isUsername = false;
        }
      } while (isUsername);
      user = await prisma.user.create({
        data: {
          firstName: decode.given_name,
          lastName: decode.family_name,
          username: username,
          email: decode.email,
          profileImageURL: decode.picture,
        },
      });
    }
    const JwtToken = JwtService.createJwt(user);
    return JwtToken;
  },
  getCurrentUser: async (parent: any, args: any, context: GraphQlContext) => {
    try {
      console.log("inside server");
      const existUser = prisma.user.findUnique({
        where: {
          email: context.user?.email,
        },
      });
      if (!existUser) {
        return "no user";
      }
      return existUser;
    } catch (error) {
      return "error occured";
    }
  },
  getUserByUsername: async (
    parent: any,
    { username }: { username: string },
  ) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      return user;
    } catch (error) {
      return { error };
    }
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
