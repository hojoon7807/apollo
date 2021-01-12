import { ApolloClient, InMemoryCache } from "@apollo/client"
const cache = new InMemoryCache();
const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache,
    resolvers: {
        Movie: {
            isLiked: () => false
        }
    },
    Mutation: {
        toggleLike: (_, { id, isLiked }, { cache }) => {
            cache.modify({
                id: cache.identify({
                    __typename: 'Movie',
                    id: id,
                }),
                fields: {
                    isLiked: !isLiked
                },
            });
        }
    }
})

export default client;
