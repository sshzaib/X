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
        username
      }
    }
  }
`);

export const getSignedURLForTweetQuery = graphql(`
  query getSignedUrl($imageType: String!) {
    getSignedUrlForTweet(imageType: $imageType)
  }
`);
