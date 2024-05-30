import { graphqlClient } from "@/clients/api";
import { createTweet } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllTweets = () => {
  const { data } = useQuery({
    queryKey: ["Todos"],
    queryFn: async () => await graphqlClient.request(getAllTweetsQuery),
  });
  return data?.getAllTweets;
};

interface variablesTypes {
  payload: {
    content: string;
    imageURL?: string;
  };
}

const queryClient = new QueryClient();

export const useCreateTweet = () => {
  const createTweetMutation = useMutation({
    mutationFn: async (variables: variablesTypes) =>
      await graphqlClient.request(createTweet, variables),
    onSuccess: () => {
      console.log("asd");
      queryClient.invalidateQueries({ queryKey: ["Todos"] });
    },
  });
  return createTweetMutation;
};
