import React from "react";
import {useQuery, gql} from '@apollo/client';
import {Link} from 'react-router-dom';
import { GET_ME } from "../gql/query";

const NoteUser = props => {
    const {loading, error, data}  =  useQuery(GET_ME);
    // const {data: userdata} =
    return (
        <React.Fragment>
            <em>Favourites:</em> {props.note.favoriteCount}
            <br/>
            {/* "data.me.id" */}
            { props.note.author.id === props.note.author.id && (<React.Fragment>
                <Link to={`/edit/${props.note.id}`}>Edit</Link>
            </React.Fragment>)}
        </React.Fragment>)
};

export default NoteUser;