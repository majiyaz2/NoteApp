import React, { Component } from "react";
import { BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favourites";
import Layout from "../components/Layout";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import NewNote from "./new";
import { IS_LOGGED_IN } from "../gql/query";
import EditNote from "./edit";



const PrivateRoute = ({component: Component, ...rest}) => {
    const {loading, error, data} = useQuery(IS_LOGGED_IN);

    if(data){
        return data.isLoggedIn === true ? (

            <Component {...rest}/>

        ):(
            <Navigate to="/signin" replace/>
        )
    }



}

const Pages = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route  path="/new" element={<PrivateRoute component={NewNote}/>}/>
                    <Route  path="/mynotes" element={<PrivateRoute component={MyNotes}/>}/>
                    <Route  path="/favorites" element={<PrivateRoute component={Favorites}/>}/>
                    <Route  path="/edit/:id" element={<PrivateRoute component={EditNote}/>}/>
                    <Route  path="/note/:id" element={<NotePage/>}/>
                    <Route  path="/signup" element={<SignUp/>}/>
                    <Route  path="/signin" element={<SignIn/>}/>
                </Routes>
            </Layout>
        </BrowserRouter> 
    );
};

export default Pages;