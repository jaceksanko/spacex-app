import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launchesPast: {
            keyArgs: false,
            merge(existing = [], incoming: any) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export default function ApiProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
