"use client";
import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
  query GetAllTweets {
    getAllTweets {
      content
      id
      imageURL
      author {
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);
