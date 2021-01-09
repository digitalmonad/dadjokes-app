import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { JOKES_API_URL } from "@env";

const httpLink = new HttpLink({
  uri: JOKES_API_URL || "https://intense-harbor-13001.herokuapp.com/",
});

console.log(JOKES_API_URL);

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
