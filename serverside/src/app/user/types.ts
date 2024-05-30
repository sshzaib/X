export const types = `#graphql
   type User {
    id: ID!
    firstName: String!
    lastName: String
    username: String
    email: String!
    profileImageURL: String
    createdAt: String! 

    tweets: [Tweet]
   }
`;
