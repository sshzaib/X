import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { userPayload } from "../../types/types";

const jwtsecret = "S3cR3T";
export class JwtService {
  public static createJwt(user: User) {
    const payload: userPayload = { id: user.id, email: user.email };
    const returnToken = jwt.sign(payload, jwtsecret);
    return returnToken;
  }
  public static decodeJwt(token: string) {
    const user = jwt.verify(token, jwtsecret);
    return user;
  }
}
