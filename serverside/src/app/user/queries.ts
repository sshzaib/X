export const queries = `#graphql
    GoogleVarification(token: String!): String
    getCurrentUser: User 
    getUserByUsername(username: String): User
`;
