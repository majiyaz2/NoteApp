import { gql } from "@apollo/client"


const GET_NOTE = gql`
    query Note($noteId: ID!) {
            note(id: $noteId) {
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
`

const IS_LOGGED_IN = gql`
query IsLoggedIn {
    isLoggedIn @client
}
`

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

export { IS_LOGGED_IN, GET_NOTE, GET_NOTES};