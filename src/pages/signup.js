import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import {useNavigate} from 'react-router-dom'


import Button from '../components/Button'
import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`


const SignUp = () => {
    const navigate = useNavigate()
    const client = useApolloClient();

    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signUp)
            console.log(data.signUp);
            client.writeQuery({
                query:gql`
                    query IsLoggedIn {
                        isLoggedIn @client
                    }
                `,
                data: {
                    isLoggedIn: true
                }
            });
            navigate('/')
        }
    })


    
    useEffect(() => {
        document.title = 'Sign Up - NoteApp';
    });

    return(
            <React.Fragment>
                <UserForm action = {signUp} formType = "signup"/>
                {loading && <p>Loading...</p>}
                {error && <p>Error creating an account! {error}</p>}
            </React.Fragment>
        );
}

export default SignUp