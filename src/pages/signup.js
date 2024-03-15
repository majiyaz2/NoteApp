import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

import Button from '../components/Button'

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

export default function SignUp(){
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
        console.log(values);
      };
    
    useEffect(() => {
        document.title = 'Sign Up - NoteApp';
    });

return(
        <Wrapper>
            <h2>Sign Up</h2>
            <Form
             onSubmit={handleSubmit}
            >
                <label htmlFor='username'>Username</label>
                <input required type='text' id='username' name='username' placeholder='Username' value={values.username} onChange={handleChange}/>
                <label htmlFor='email'>Email</label>
                <input required type='text' id='email' name='email' placeholder='Email' value={values.email} onChange={handleChange}/>
                <label htmlFor='password'>Password</label>
                <input required type='password' id='password' name='password' placeholder='Password' value={values.password} onChange={handleChange}/>
                <Button type='submit' onClick={handleSubmit}>Submit</Button>
            </Form>
        </Wrapper>
    );
}