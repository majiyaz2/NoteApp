import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import {useNavigate} from 'react-router-dom'


import Button from '../components/Button'

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;

`

const Form = styled.form`
    label,
    input{
        display: block;
        line-height: 2em;
    }
    input{
        width 100%
        margin-bottom: 1em
    }
`

const UserForm = props => {

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange=(event)=>{
        setValues({...values,[event.target.name]: event.target.value})
            };
      
    const handleSubmit = (event) => {
        event.preventDefault();
        props.action({
            variables: {
                ...values
            }
        });
      };
    
    useEffect(() => {
        document.title = 'Sign Up - NoteApp';
    });

return(
        <Wrapper>
            {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            
            <Form
             onSubmit={handleSubmit}
            >
                {props.formType=== 'signup' && (
                    <React.Fragment>
                        <label htmlFor='username'>Username</label>
                        <input required type='text' id='username' name='username' placeholder='Username' value={values.username} onChange={handleChange}/>
                    </React.Fragment>
                )}
                
                <label htmlFor='email'>Email</label>
                <input required type='text' id='email' name='email' placeholder='Email' value={values.email} onChange={handleChange}/>
                <label htmlFor='password'>Password</label>
                <input required type='password' id='password' name='password' placeholder='Password' value={values.password} onChange={handleChange}/>
                <Button type='submit' onClick={handleSubmit}>Submit</Button>
            </Form>
        </Wrapper>
    );
}

export default UserForm