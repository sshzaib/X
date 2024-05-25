import { jwtDecode } from "jwt-decode";
import { prisma } from "../../clients/db";
import { JwtService } from "../../services/jwt";
import { userPayload } from "../../types/types";

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
    { token }: { token: string },
  ) => {
    const tokenDecode = JwtService.decodeJwt(token) as userPayload;
    try {
      const user = prisma.user.findUnique({
        where: {
          email: tokenDecode.email,
        },
      });
      if (!user) {
        return "no user";
      }
      return user;
    } catch (error) {
      return "error occured";
    }
  },
};

export const resolvers = { queries };
