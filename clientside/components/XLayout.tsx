"use client";
import { BsPerson } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import React, { useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "@/clients/api";
import { verifyGoogleOauthToken } from "@/graphql/query/user";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { navbar } from "@/types/types";
import { useGetCurrentUser } from "@/hooks/user";
import { User } from "@/gql/graphql";
import { useRouter } from "next/navigation";

const navbarList: navbar[] = [
  {
    title: "Home",
    icon: <GoHomeFill />,
    navigate: "/",
  },
  {
    title: "Explore",
    icon: <IoSearch />,
    navigate: "",
  },
  {
    title: "Notifications",
    icon: <IoNotificationsOutline />,
    navigate: "",
  },
  {
    title: "Messages",
    icon: <FaRegEnvelope />,
    navigate: "",
  },
  {
    title: "Profile",
    icon: <BsPerson />,
    navigate: "",
  },
  {
    title: "More",
    icon: <CiCircleMore />,
    navigate: "",
  },
];
export const XLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useGetCurrentUser();
  console.log(data);
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="col-span-3 h-screen sticky top-0 flex justify-end pr-10">
        <Sidebar user={data as User} />
      </div>
      <div className="col-span-9 h-screen overflow-y-auto">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-6 border-x border-slate-600">{children}</div>
          <div className="col-span-6">
            <PeopleRecommendation />
          </div>
        </div>
      </div>
    </div>
  );
};
const Sidebar: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  return (
    <div>
      <div className="cursor-pointer hover:bg-slate-900 w-fit rounded-full p-3 transition-all">
        <FaXTwitter className="text-3xl" />
      </div>
      <ul>
        {navbarList.map((item) => (
          <li
            key={item.title}
            className="cursor-pointer flex items-center gap-4 text-xl justify-center hover:bg-slate-900 w-fit rounded-full transition-all p-3 pr-7 "
          >
            <button
              onClick={() => router.push(`/${user.username}`)}
              className="flex"
            >
              <span className="text-3xl">{item.icon}</span>
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 ">
        <button className="bg-[#1d9bf0] rounded-full w-full py-3.5 font-bold">
          Post
        </button>
      </div>
      <div className="absolute bottom-5 flex items-center gap-4 hover:bg-[#181818] cursor-pointer rounded-full p-3 ">
        {user?.profileImageURL && (
          <Image
            src={user.profileImageURL}
            alt="profile-pic"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col ">
          <div className="font-medium flex text-sm">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="text-[#5D6165] text-sm">@{user?.username}</div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
};

function PeopleRecommendation() {
  const [search, setSearch] = useState("");
  async function handleSuccessGoogleLogin(cred: CredentialResponse) {
    if (!cred || !cred.credential) return console.error("failed to login");
    const data = await graphqlClient.request(verifyGoogleOauthToken, {
      token: cred.credential,
    });
    localStorage.setItem("__x_token", data.GoogleVarification || "");
  }
  return (
    <div className="ml-8 flex flex-col w-[23rem] mt-1">
      <div className="bg-[#202327] w-full p-3 focus:outline-red-200 flex items-center gap-4 rounded-full ">
        <IoSearch className="text-slate-500 text-xl" />
        <input
          type="text"
          value={search}
          className="bg-[#202327] w-full focus:outline-none "
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <GoogleLogin onSuccess={handleSuccessGoogleLogin} />
    </div>
  );
}
