import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTweets = () => {
  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => graphqlClient.request(getAllTweetsQuery),
  });
  return data?.getAllTweets;
};
