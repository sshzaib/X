"use client";
import Image from "next/image";
import { Textarea } from "@/components/Textarea";
import { FaGlobeAsia } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useGetCurrentUser } from "@/hooks/user";
import { Tweet, User } from "@/gql/graphql";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import FeedCard from "@/components/FeedCard";
import { NotAuth } from "@/components/NotAuth";
import { XLayout } from "@/components/XLayout";
import { FaXTwitter } from "react-icons/fa6";
import { graphqlClient } from "@/clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";

export default function Home() {
  const { data, isLoading } = useGetCurrentUser();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaXTwitter className="text-6xl" />
      </div>
    );
  }
  if (data) {
    return (
      <div>
        <XLayout>
          <XFeed user={data as User} />
        </XLayout>
      </div>
    );
  } else {
    return (
      <div>
        <NotAuth />
      </div>
    );
  }
}

const XFeed: React.FC<{ user: User }> = ({ user }) => {
  const [imageURL, setImageURL] = useState("");
  const queryClient = useQueryClient();
  const [tweet, setTweet] = useState<string>("");
  const tweets = useGetAllTweets();
  const handleTextareaOnchange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTweet(e.target.value);
  };
  const mutation = useCreateTweet();
  const handlePostTweet = async () => {
    await queryClient.invalidateQueries({ queryKey: ["Todos"] });
    const payload = {
      payload: {
        content: tweet,
        imageURL: imageURL,
      },
    };
    mutation.mutate(payload);
    setTweet("");
  };
  const handleInputFileChange = (input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;
      const { getSignedUrlForTweet } = await graphqlClient.request(
        getSignedURLForTweetQuery,
        {
          imageType: file.type,
        },
      );
      console.log(getSignedUrlForTweet);
      console.log(file);
      if (getSignedUrlForTweet) {
        await axios.put(getSignedUrlForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        const url = new URL(getSignedUrlForTweet);
        const filePath = `${url.origin}${url.pathname}`;
        setImageURL(filePath);
      }
    };
  };

  const handleSelectImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputFileChange(input);

    input.addEventListener("change", handlerFn);
    input.click();
  };

  return (
    <div className="grid grid-cols-12 mt-2 px-4 border-b border-slate-900 ">
      <div className="col-span-1">
        {user?.profileImageURL ? (
          <Image
            src={user?.profileImageURL}
            width={40}
            height={40}
            alt="user profile image"
            className="rounded-full"
          />
        ) : null}
      </div>
      <div className="col-span-11 ">
        <Textarea
          placeholder="What is happening?!"
          value={tweet}
          onChange={handleTextareaOnchange}
        />
        <div className="border-b flex items-center gap-2 font-semibold text-sm border-gray-800 text-[#1D9BF0] pb-4">
          <FaGlobeAsia />
          Everone can reply
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#1D9BF0] text-l hover:bg-[#031018] rounded-full cursor-pointer p-3 ">
            <FaRegImage />
          </div>
          <div className="my-3 ">
            {imageURL && (
              <Image
                src={imageURL}
                alt="tweet-image"
                width={300}
                height={300}
              />
            )}
            <div className="border-b  flex items-center gap-2 font-semibold text-sm border-gray-800 text-[#1D9BF0] pb-4">
              <FaGlobeAsia />
              Everone can reply
            </div>
            <div className="flex items-center my-3  justify-between">
              <div className="text-[#1D9BF0] text-l hover:bg-[#031018] rounded-full cursor-pointer p-3">
                <FaRegImage onClick={handleSelectImage} />
              </div>
              <div>
                <button
                  className="bg-[#1d9bf0] rounded-full px-4 py-1.5 font-bold"
                  onClick={handlePostTweet}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tweets
        ? tweets.map((tweet) => <FeedCard tweet={tweet as Tweet} />)
        : null}
    </div>
  );
};
