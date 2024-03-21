import React from "react";
import styled from "styled-components";
import logo from "../img/logo.svg";
import { useQuery, gql, useApolloClient, ApolloProvider} from "@apollo/client";
import { Link } from "react-router-dom";
import ButtonAsLink from "./ButtonAsLink";
import {useNavigate} from 'react-router-dom'

const IS_LOGGED_IN = gql`
query IsLoggedIn {
    isLoggedIn @client
  }
`

const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;
`
const LogoText = styled.h1`
    margin: 0;
    padding: 0;
    display: inline;
`

const UserState = styled.div`
    margin-left: auto;
`

const Header = () => {
    const navigate = useNavigate()
    const {data} = useQuery(IS_LOGGED_IN)
    console.log(data)
    const client = useApolloClient()
    return (
        <HeaderBar>
            <img src={logo} alt="logo"/>
            <LogoText>NoteAPP</LogoText>
            <UserState>
                {
                    data.isLoggedIn ? (
                        <ApolloProvider>
                        <ButtonAsLink
                            onClick={()=>{
                                localStorage.removeItem('token')
                                client.writeQuery({
                                    query: IS_LOGGED_IN,
                                    data: {
                                        isLoggedIn: false
                                    }
                                })
                                // client.resetStore()
                                navigate('/')
                            }}
                        >
                            Log Out
                        </ButtonAsLink>
                            </ApolloProvider>
                    ):(
                        <p>
                            <Link to={'/signin'}>Sign In</Link>or{' '}
                            <Link to={'/signup'}>Sign Up</Link>
                        </p>
                    )
                }
            </UserState>
        </HeaderBar>
    );
};

export default Header