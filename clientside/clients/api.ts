import { GraphQLClient } from "graphql-request";
export const graphqlClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    headers: {
      authorization: `Bearer ${localStorage.getItem("__x_token")}`,
    },
  },
);
