import { GraphQLClient } from "graphql-request";
let token;
if (typeof window != "undefined") {
  token = localStorage.getItem("__x_token");
}
export const graphqlClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    headers: {
      authorization: `Bearer ${token}`,
    },
  },
);
