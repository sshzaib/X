import { graphql } from "@/gql";

export const createTweet = graphql(`
  mutation createTweet($payload: TweetContent!) {
    createTweet(payload: $payload) {
      id
    }
  }
`);
