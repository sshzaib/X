"use client";
import { BsPerson } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import React, { useState } from "react";
import FeedCard from "@/components/FeedCard";
import { CiCircleMore } from "react-icons/ci";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { getTokenFromLocalStorage, graphqlClient } from "@/clients/api";
import { getCurrentUser, verifyGoogleOauthToken } from "@/graphql/query/user";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { navbarType, userState } from "@/types/types";
import { Textarea } from "@/components/Textarea";
import { FaGlobeAsia } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { useGetAllTweets } from "@/hooks/tweet";

const navbarList: navbarType[] = [
  {
    title: "Home",
    icon: <GoHomeFill />,
  },
  {
    title: "Explore",
    icon: <IoSearch />,
  },
  {
    title: "Notifications",
    icon: <IoNotificationsOutline />,
  },
  {
    title: "Messages",
    icon: <FaRegEnvelope />,
  },
  {
    title: "Profile",
    icon: <BsPerson />,
  },
  {
    title: "More",
    icon: <CiCircleMore />,
  },
];
export default function Home() {
  const [user, setUser] = useState<userState>({
    firstName: "",
    lastName: "",
    email: "",
    profileImageURL: "",
  });
  async function currentuser() {
    const token = getTokenFromLocalStorage();
    const response = await graphqlClient.request(
      getCurrentUser,
      {},
      { authorization: token || "" },
    );
    if (response.getCurrentUser) {
      setUser({
        firstName: response.getCurrentUser.firstName ?? "",
        lastName: response.getCurrentUser.lastName ?? "",
        email: response.getCurrentUser?.email ?? "",
        profileImageURL: response.getCurrentUser.profileImageURL ?? "",
      });
    }
  }
  currentuser();
  return (
    <div className="grid grid-cols-12 gap-10 h-screen w-screen px-36">
      <Sidebar user={user} />
      <XFeed user={user} />
      <PeopleRecommendation />
    </div>
  );
}
const Sidebar: React.FC<{ user: userState }> = ({ user }) => {
  return (
    <div className="col-span-3 static top-0">
      <div className="cursor-pointer hover:bg-slate-900 w-fit rounded-full p-3 transition-all">
        <FaXTwitter className="text-3xl" />
      </div>
      <ul>
        {navbarList.map((item) => (
          <li
            key={item.title}
            className="cursor-pointer flex items-center gap-4 text-xl justify-center hover:bg-slate-900 w-fit rounded-full transition-all p-3 pr-7 "
          >
            <span className="text-3xl">{item.icon}</span>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="mr-14 mt-4 ">
        <button className="bg-[#1d9bf0] rounded-full w-full py-3.5 font-bold">
          Post
        </button>
      </div>
      <div className="absolute bottom-5 flex items-center gap-4 hover:bg-[#181818] cursor-pointer rounded-full p-3 ">
        <Image
          src={"https://avatars.githubusercontent.com/u/115782804?v=4"}
          alt="profile-pic"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col pr-16">
          <div className="font-medium">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-[#5D6165]">@shahzaib_hi</div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
};

const XFeed: React.FC<{ user: userState }> = ({ user }) => {
  const [tweet, setTweet] = useState<string>("");
  const tweet2 = useGetAllTweets();
  console.log(tweet2);
  const handleTextareaOnchange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTweet(e.target.value);
  };
  return (
    <div className="col-span-6 border-x flex-1 border-slate-600">
      <div>
        <div className="grid grid-cols-12 mt-2 px-4 border-b border-slate-900 ">
          <div className="col-span-1">
            <Image
              src={user.profileImageURL}
              width={40}
              height={40}
              alt="user profile image"
            />
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
                <button className="bg-[#1d9bf0] rounded-full px-4 py-1.5 font-bold">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  );
};
function PeopleRecommendation() {
  async function handleSuccessGoogleLogin(cred: CredentialResponse) {
    if (!cred || !cred.credential) return console.error("failed to login");
    const data = await graphqlClient.request(verifyGoogleOauthToken, {
      token: cred.credential,
    });
    localStorage.setItem("__x_token", data.GoogleVarification || "");
  }
  return (
    <div className="col-span-3 ">
      <GoogleLogin onSuccess={handleSuccessGoogleLogin} />
    </div>
  );
}
