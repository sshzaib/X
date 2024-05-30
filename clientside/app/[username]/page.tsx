import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import { XLayout } from "@/components/XLayout";
import { Tweet } from "@/gql/graphql";
import { getUserByUsername } from "@/graphql/query/user";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <div>
      <XLayout>
        <UserProfile username={params.username} />
      </XLayout>
    </div>
  );
}

const UserProfile = async ({ username }: { username: string }) => {
  const user = await graphqlClient.request(getUserByUsername, {
    username,
  });
  //use useMemo here
  return (
    <div>
      <div className="grid grid-cols-12 cursor-pointer">
        <div className="col-span-1 flex items-center justify-center pl-4">
          <div className="hover:bg-[#181919] p-2 rounded-full">
            <FaArrowLeft />
          </div>
        </div>
        <div className="col-span-11">
          <div className="font-bold ml-6 mt-1">
            {user.getUserByUsername?.firstName}{" "}
            {user.getUserByUsername?.lastName}
          </div>
          <div className="ml-6 text-sm text-[#6E7378]">
            {user.getUserByUsername?.tweets?.length} posts
          </div>
        </div>
      </div>
      <div className="w-full bg-[#333639] h-48 relative">
        {user.getUserByUsername?.profileImageURL && (
          <Image
            src={user.getUserByUsername?.profileImageURL}
            width={130}
            height={130}
            className="absolute top-28 left-4 rounded-full"
            alt="user profile"
          />
        )}
      </div>
      <div className="w-full h-56 border-b border-[#2F3336] pl-4">
        <div className="pt-20 font-bold text-lg flex">
          {user.getUserByUsername?.firstName}
          {"  "}
          {user.getUserByUsername?.lastName}
        </div>
        <div className="text-sm text-[#696e72]">
          @{user.getUserByUsername?.username}
        </div>
      </div>
      {user.getUserByUsername?.tweets && (
        <div>
          {user.getUserByUsername.tweets.map((tweet) => (
            <FeedCard tweet={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      )}
    </div>
  );
};
