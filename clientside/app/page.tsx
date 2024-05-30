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
      },
    };
    mutation.mutate(payload);
    setTweet("");
  };
  return (
    <div>
      <div>
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
                <button
                  className="bg-[#1d9bf0]   rounded-full px-4 py-1.5 font-bold"
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
