import { PrismaClient } from "@prisma/client";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

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
    const prisma = new PrismaClient();
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

    const payload = { userId: user.id, email: user.email };
    const jwtsecret = "S3cR3T";

    const returnToken = jwt.sign(payload, jwtsecret);
    return returnToken;
  },
};

export const resolvers = { queries };
