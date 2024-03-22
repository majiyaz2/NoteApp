import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import ButtonAsLink from "./ButtonAsLink";
import { TOGGLE_FAVORITE } from "../gql/mutation";
import { GET_MY_FAVS } from "../gql/query";

const FavoriteNote = props => {
    const [count, setCount] = useState(props.favoriteCount);
    const [favorited, setFavorited] = useState(
        props.me.favorites.filter(note=>note.id == props.noteId).length > 0
    );

    const [toggleFavorite] = useMutation(
        TOGGLE_FAVORITE, {
            variables: {
                toggleFavoriteId: props.noteId
            },
            refetchQueries: [{query: GET_MY_FAVS}]
        }
    )

    return(
        <React.Fragment>
            {favorited ? (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite()
                        setFavorited(false);
                        setCount(count - 1)
                    }}
                >
                    Remove Favorite
                </ButtonAsLink>
            ):(
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite()
                        setFavorited(true);
                        setCount(count + 1)
                    }}
                >
                    Add Favorite
                </ButtonAsLink>
            )}
            : {count}
        </React.Fragment>
    )

    // return <ButtonAsLink>Add to favorites</ButtonAsLink>
}

export default FavoriteNote;