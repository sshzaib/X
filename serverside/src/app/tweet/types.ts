export const types = `#grphql 
   type Tweet {
    id: ID!
    content: String!
    imageURL: String
    
    author: User
   }
  input TweetContent {
    content: String!
    imageURL: String
  }
 `;
