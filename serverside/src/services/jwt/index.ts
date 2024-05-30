import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWTUser } from "../../types/types";

const jwtsecret = "S3cR3T";

export class JwtService {
  public static createJwt(user: User) {
    const payload: JWTUser = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, jwtsecret);
    return token;
  }
  public static decodeJwt(token: string) {
    try {
      return jwt.verify(token, jwtsecret) as JWTUser;
    } catch (error) {
      return null;
    }
  }
}
