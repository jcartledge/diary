import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: { DiaryEntry: { keyFields: ["date"] } },
  }),
});
