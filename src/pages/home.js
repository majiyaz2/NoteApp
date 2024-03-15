import React, {useEffect} from "react";
import {useQuery, gql} from '@apollo/client';
import NoteFeed from "../components/NoteFeed";

const GET_NOTES = gql`
    query NoteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                username
                id
                avatar
                }
            }
        }
    }
`

const Home = () => {
    useEffect(() => {
        document.title = "Home - Notedly";
    });

    const {data, loading, error, fetchMore} = useQuery(GET_NOTES)
    
    if (loading) return <p>Loading...</p>; 

    if (error) return <p>Error!</p>;
    
    return (
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes}/>
            {data.noteFeed.hasNextPage && (
                <button onClick={()=>
                    fetchMore({
                        variables: {
                            cursor: data.noteFeed.cursor
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            return {
                                noteFeed: {
                                    cursor: fetchMoreResult.noteFeed.cursor,
                                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                    notes: [
                                        ...previousResult.noteFeed.notes,
                                        ...fetchMoreResult.noteFeed.notes
                                    ],
                                    __typename: 'noteFeed'
                                }
                            }
                        }
                    })
                }
                >
                    Load more
                    </button>
            )}
        </React.Fragment>
    );
};

export default Home;