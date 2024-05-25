import { graphql } from "@/gql";

export const verifyGoogleOauthToken = graphql(`
  query verifyGoogleOauthToken($token: String!) {
    GoogleVarification(token: $token)
  }
`);

export const getCurrentUser = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      email
      profileImageURL
      lastName
    }
  }
`);
