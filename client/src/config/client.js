import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const favorites = makeVar([]);

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({ typePolicies: {
    Query: {
      fields: {
        findAllMovies: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        findAllTvSeries: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        favorites: {
          read() {
            return favorites()
          }
        }
      }
    }
  } })
});

export default client;