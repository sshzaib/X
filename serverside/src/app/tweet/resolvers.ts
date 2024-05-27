import { Tweet, User } from "@prisma/client";
import { prisma } from "../../clients/db";
import { GraphQlContext } from "../../types/types";

interface CreateTweetPayload {
  content: string;
  imageURL: string;
}

const queries = {
  getAllTweets: async (parent: any, args: any, ctx: GraphQlContext) => {
    if (ctx.user?.userId) {
      const tweets = await prisma.tweet.findMany();
      return tweets;
    }
  },
};
const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    context: GraphQlContext,
  ) => {
    const { content, imageURL } = payload;
    if (context.user?.email) {
      try {
        const tweet = await prisma.tweet.create({
          data: {
            content,
            imageURL,
            author: {
              connect: {
                id: context.user.userId,
              },
            },
          },
        });
        return tweet;
      } catch (error) {
        console.log(error);
      }
    } else {
      return { error: "error" };
    }
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
