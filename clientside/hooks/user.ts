import { graphqlClient } from "@/clients/api";
import { getCurrentUser } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => graphqlClient.request(getCurrentUser),
  });

  return { data: data?.getCurrentUser, isLoading };
};
