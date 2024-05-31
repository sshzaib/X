import { Tweet } from "@prisma/client";
import { prisma } from "../../clients/db";
import { GraphQlContext } from "../../types/types";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface CreateTweetPayload {
  content: string;
  imageURL: string;
}

const s3client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET || "",
  },
});
const queries = {
  getAllTweets: async (parent: any, args: any, ctx: GraphQlContext) => {
    if (ctx.user?.userId) {
      const tweets = await prisma.tweet.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return tweets;
    }
  },
  getSignedUrlForTweet: async (
    parent: any,
    { imageType }: { imageType: string },
    ctx: GraphQlContext,
  ) => {
    if (!ctx.user || !ctx.user.userId) {
      throw new Error("Unauthenticated");
    }
    const allowedImageTypes = ["jpg", "jpeg", "image/png", "webp"];
    if (!allowedImageTypes.includes(imageType))
      throw new Error("Image type not supported");
    const putObjectCommand = new PutObjectCommand({
      Bucket: "bucket-twitter-app",
      Key: `uploads/${ctx.user.userId}/tweets/${Date.now().toString()}.${imageType}`,
    });
    const signedURL = await getSignedUrl(s3client, putObjectCommand);
    return signedURL;
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
