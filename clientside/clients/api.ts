import { GraphQLClient } from "graphql-request";
export const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("__x_token");
  }
  return null;
};

const token = getTokenFromLocalStorage();

export const graphqlClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    headers: {
      authorization: `Bearer ${token}`,
    },
  },
);
