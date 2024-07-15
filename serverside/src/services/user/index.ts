import { prisma } from "../../clients/db";
import { jwtDecode } from "jwt-decode";
import { JwtService } from "../jwt";

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

class UserService {
  static async verifyGoogleAuthToken(token: string) {
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
        isUsername = true;
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
  }
  static getCurrentUser(email: string) {
    try {
      const existUser = prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!existUser) {
        return "no user";
      }
      return existUser;
    } catch (error) {
      return "error occured";
    }
  }
  static async getUserByUsername(username: string) {
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
  }
}

export default UserService;
