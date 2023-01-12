import { useState } from 'react';
import styled from 'styled-components';

export default function EditForm({ text, id, onSubmission }) {
  const [content, setContent] = useState(text);
  const [error, setError] = useState(false);

  function handleClick() {
    if (content.trim() === '') {
      setError(true);
      return;
    }
    onSubmission(content);
    setContent('');
    setError(false);
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <>
      <FormStyled>
        <TextareaStyled
          name={`comment_edit_name_${id}`}
          id={`comment_edit_${id}`}
          rows="5"
          value={content}
          onChange={handleChange}
          error={error}
        ></TextareaStyled>
        <ButtonStyled type="submit" onClick={handleClick}>
          Update
        </ButtonStyled>
      </FormStyled>
      {error && (
        <ErrorStyled error={error}>Comment cannot be empty</ErrorStyled>
      )}
    </>
  );
}

const FormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  padding: 1.2rem 0rem;
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
`;

const ButtonStyled = styled.button`
  background-color: hsl(238, 40%, 52%);
  color: #fff;
  border: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.5;
  }
`;

const TextareaStyled = styled.textarea`
  flex: 1;
  width: 100%;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 2px solid ${(props) => (props.error ? 'red' : '#ccc')};
  &:focus {
    outline: none;
    border: 2px solid hsl(238, 40%, 52%);
  }
`;

const ErrorStyled = styled.p`
  padding: 1rem;
  background: red;
  color: white;
  font-weight: bold;
  width: 100%;
  border-radius: 0.5rem;
  text-align: center;
`;
