import { jwtDecode } from "jwt-decode";
import { prisma } from "../../clients/db";
import { JwtService } from "../../services/jwt";
import { JWTUser } from "../../types/types";
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
    let user = await prisma.user.findUnique({
      where: {
        email: decode.email,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName: decode.given_name,
          lastName: decode.family_name,
          email: decode.email,
          profileImageURL: decode.picture,
        },
      });
    }
    const userToken = JwtService.createJwt(user);
    return userToken;
  },
  getCurrentUser: async (
    parent: any,
    args: any,
    { user }: { user: JWTUser },
  ) => {
    try {
      const existUser = prisma.user.findUnique({
        where: {
          email: user.email,
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
