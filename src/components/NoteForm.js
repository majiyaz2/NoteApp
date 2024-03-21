import React, {useState} from "react";
import styled from "styled-components";

import Button from "./Button";
import { set } from "date-fns";

const Wrapper = styled.div`
    height: 100%;
`;

const Form = styled.form`
    height: 100%;
`;

const TextArea = styled.textarea`
    width:100%;
    height:100%;
`;

const NoteForm = props => {
    const [values, setValue] = useState({content: props.content || ''});

    const onChange = event => {
        setValue({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.action({
            variables: {
                ...values
            }
        });
      };
    

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <TextArea
                    required
                    type = "text"
                    name="content"
                    placeholder="Note content"
                    value = {values.content}
                    onChange={onChange}
                />
                <Button type="submit">Save</Button>
            </Form>
        </Wrapper>
    );
}; 

export default NoteForm;