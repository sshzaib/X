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
      username
      profileImageURL
      lastName
    }
  }
`);

export const getUserByUsername = graphql(`
  query GetUserByUsername($username: String) {
    getUserByUsername(username: $username) {
      firstName
      lastName
      profileImageURL
      username
      createdAt
      tweets {
        content
        imageURL
        id
        author {
          firstName
          lastName
          profileImageURL
          username
        }
      }
    }
  }
`);
