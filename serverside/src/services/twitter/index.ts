import { prisma } from "../../clients/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET || "",
  },
});

class TweetService {
  static async getAllTweets(id: string) {
    if (id) {
      const tweets = await prisma.tweet.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return tweets;
    }
  }
  static async getSignedInURL(imageType: string, userId: string) {
    const allowedImageTypes = ["jpg", "jpeg", "image/png", "webp"];
    if (!allowedImageTypes.includes(imageType))
      throw new Error("Image type not supported");
    const putObjectCommand = new PutObjectCommand({
      Bucket: "bucket-twitter-app",
      Key: `uploads/${userId}/tweets/${Date.now().toString()}.${imageType}`,
    });
    const signedURL = await getSignedUrl(s3client, putObjectCommand);
    return signedURL;
  }
  static async createTweet(
    email: string,
    content: string,
    imageURL: string,
    id: string,
  ) {
    if (email) {
      try {
        const tweet = await prisma.tweet.create({
          data: {
            content,
            imageURL,
            author: {
              connect: {
                id,
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
  }
}
export default TweetService;
