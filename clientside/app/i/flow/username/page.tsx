"use client";
import { NotAuth } from "@/components/NotAuth";
import { FaXTwitter } from "react-icons/fa6";
export default function page() {
  return (
    <div>
      <div className="relative">
        <div className="absolute z-10 bg-[#242D34] h-screen w-screen opacity-70"></div>
        <div className="absolute inset-y-9 bg-[#000000] flex justify-center rounded-xl inset-x-[470px] z-20">
          <div className="mt-2 relative">
            <div className="flex justify-center ">
              <FaXTwitter className="text-3xl" />
            </div>
            <div className="mt-8 text-3xl font-semibold">
              What should we call you?
            </div>
            <div className="mt-3 text-[#63686C] focus:bg-red-200">
              Your @username is unique. You can always change it later.
            </div>
            <div className="mt-8 relative group">
              <div className="absolute inset-y-0 flex flex-col justify-center ps-3 pointer-events-none">
                <div className="text-[#6D7277] text-xs group-focus-within:text-[#1D9BF0]">
                  Username
                </div>
                <div className="text-[#6D7277] group-focus-within:text-[#1D9BF0]">
                  @
                </div>
              </div>
              <input
                className="block w-full pt-7 pb-3 bg-transparent ps-9 text-md text-white border border-[#6D7277] rounded-lg"
                placeholder="Username"
              />
            </div>
            <div className="absolute bottom-10 w-full ">
              {/* The user is already signed up and navigate the user to the home page and show this div
               */}
              <button className="border w-full rounded-full p-4 border-slate-600 hover:bg-[#181919]">
                Skip for now
              </button>
            </div>
          </div>
        </div>
        <NotAuth />
      </div>
    </div>
  );
}
