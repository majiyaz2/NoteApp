import React, { useEffect } from "react";
import { useQuery,gql } from "@apollo/client";

import NoteFeed from "../components/NoteFeed";
import { GET_MY_FAVS } from "../gql/query";



const MyNotes = () => {
    useEffect(() => {
        document.title = "My Notes - Notedly";
    });

    const {loading, error, data} = useQuery(GET_MY_FAVS);

    if (loading) return <p>Loading...</p>
    
    if (error) return `Error! ${error}`;

    if (data.me.favorites.length !== 0){
        return <NoteFeed notes={data.me.favorites}/>
    }else{
        return (
            <div>
                <p>These no favorites yet</p>
            </div>
        );
    }
};

export default MyNotes;