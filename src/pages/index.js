import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favourites";
import Layout from "../components/Layout";

const Pages = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route  path="/mynotes" element={<MyNotes/>}/>
                    <Route  path="/favorites" element={<Favorites/>}/>
                </Routes>
            </Layout>
        </BrowserRouter> 
    );
};

export default Pages;