import { graphqlClient } from "@/clients/api";
import { getCurrentUser } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const { data } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: () => graphqlClient.request(getCurrentUser),
  });

  return data?.getCurrentUser;
};
