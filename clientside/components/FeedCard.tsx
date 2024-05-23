import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";

export default function FeedCard() {
  return (
    <div className="grid grid-cols-12 mt-2 px-4 border-b border-slate-900 ">
      <div className="col-span-1 ">
        <Image
          src={"https://avatars.githubusercontent.com/u/115782804?v=4"}
          alt="profile-pic"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="col-span-11 ml-2 cursor-pointer ">
        <div className="hover:underline font-semibold w-fit">Zaib_dev</div>
        <div>
          ‘Browsing’ is about to be completely transformed. Finally, our AIs
          have learnt to speak our languages, and actually see what we see. This
          demo is particularly close to my heart. It completes work that I
          started at DeepMind back in 2011.
        </div>
        <div className="flex justify-between pr-20">
          <div className="text-xl text-slate-500 hover:text-[#1d9bf0] hover:bg-[#0a171f] rounded-full p-2 transition-all">
            <FaRegComment />
          </div>
          <div className="text-2xl  hover:text-[#029262] text-slate-500 hover:bg-[#071A14] rounded-full p-2 transition-all">
            <BiRepost />
          </div>
          <div className="text-xl  text-slate-500 hover:text-[#f91880] hover:bg-[#200914] rounded-full p-2 transition-all">
            <FaRegHeart />
          </div>
        </div>
      </div>
    </div>
  );
}
