import React from "react";
import ReactMarkdown from "react-markdown"
import {format} from 'date-fns'
import styled from "styled-components";
import NoteUser from "./NoteUser";
import { IS_LOGGED_IN } from "../gql/query";
import { useQuery } from "@apollo/client";

const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

const MetaData = styled.div`
    @media (min-width: 500px){
        display: flex;
        align-items: top;
    }
`;

const MetaInfo = styled.div`
    padding-right: 1em;
`
const UserActions = styled.div`
    margin-left: auto;
`

const Note = ({note}) => {
    const {loading, error, data} = useQuery(IS_LOGGED_IN);
    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img 
                            src={note.author.avatar}
                            alt={`${note.author.username} avatar`}
                            height = "50px"
                    />
                </MetaInfo>
                <MetaInfo> 
                    <em>by</em> {note.author.username} <br/>
                    {format(note.createdAt, 'MMM d yyyy')}
                </MetaInfo>
                {data.isLoggedIn ? (<UserActions>
                    <NoteUser note = {note} />
                </UserActions>):
                (<UserActions>
                    <em>Favourites:</em> {note.favoriteCount}
                </UserActions>)}
            </MetaData>
            <ReactMarkdown children={note.content} />
        </StyledNote>
        // <article key={note.id}>
        //             <img 
        //                 src={note.author.avatar}
        //                 alt={`${note.author.username} avatar`}
        //                 height = "50px"
        //             />{' '}
        //             {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
        //             <ReactMarkdown children={note.content} />
        //         </article>
    );
};

export default Note;