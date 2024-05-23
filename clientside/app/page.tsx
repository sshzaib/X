import { BsPerson } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import React from "react";
import FeedCard from "@/components/FeedCard";
import { CiCircleMore } from "react-icons/ci";

interface navbarType {
  title: string;
  icon: React.ReactNode;
}
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
  return (
    <div className="grid grid-cols-12 h-screen w-screen px-36 overflow-x-hidden overflow-y-scroll">
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
        <div className="mr-14 mt-4">
          <button className="bg-[#1d9bf0] rounded-full w-full py-3.5 font-bold">
            Post
          </button>
        </div>
      </div>
      <div className="col-span-6 border-x border-slate-600">
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
      <div className="col-span-3 "></div>
    </div>
  );
}
