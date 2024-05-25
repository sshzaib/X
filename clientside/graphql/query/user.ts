import { graphql } from "@/gql";

export const generateGoogleAuthToken = graphql(`
  query generateGoogleAuthToken($token: String!) {
    GoogleVarification(token: $token)
  }
`);
