export interface JWTUser {
  userId: string;
  email: string;
}

export interface GraphQlContext {
  user?: JWTUser;
}
