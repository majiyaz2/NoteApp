import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import {useNavigate} from 'react-router-dom'

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`


const SignIn = () => {

    const navigate = useNavigate()
    const client = useApolloClient();

    const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signIn)
            console.log(data.signIn);
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
        document.title = 'Sign In - Notedly';
    });

    return (
        <React.Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Error Signing In! {error}</p>}
            <UserForm action = {signIn} formType="signIn"/>
        </React.Fragment>
    );
};

export default SignIn;