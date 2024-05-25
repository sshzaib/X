import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: "**/*.{tsx,ts}",
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
    },
  },
};

export default config;
