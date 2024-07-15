import { Tweet } from "@prisma/client";
import { prisma } from "../../clients/db";
import { GraphQlContext } from "../../types/types";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import TweetService from "../../services/twitter";

interface CreateTweetPayload {
  content: string;
  imageURL: string;
}

const queries = {
  getAllTweets: async (parent: any, args: any, ctx: GraphQlContext) => {
    return TweetService.getAllTweets(ctx.user?.userId as string);
  },
  getSignedUrlForTweet: async (
    parent: any,
    { imageType }: { imageType: string },
    ctx: GraphQlContext,
  ) => {
    if (!ctx.user || !ctx.user.userId) {
      throw new Error("Unauthenticated");
    }
    return TweetService.getSignedInURL(imageType, ctx.user.userId);
  },
};
const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    context: GraphQlContext,
  ) => {
    const { content, imageURL } = payload;
    TweetService.createTweet(
      context.user?.email as string,
      content,
      imageURL,
      context.user?.userId as string,
    );
  },
};

const extraResolvers = {
  Tweet: {
    author(parent: Tweet) {
      const user = prisma.user.findUnique({
        where: {
          id: parent.authorId,
        },
      });
      return user;
    },
  },
};
export const resolvers = { queries, mutations, extraResolvers };
