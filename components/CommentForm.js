import { useState, useContext } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

export default function CommentForm({ type, id, onSubmission }) {
  const [content, setContent] = useState('');
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
      <CommentFormContainer>
        <Avatar size="medium" img={'./images/avatars/image-juliusomo.png'} />
        <TextareaStyled
          name={`comment_name_${id}`}
          id={`comment_${id}`}
          rows="5"
          placeholder={`Add a ${type}...`}
          value={content}
          error={error}
          onChange={handleChange}
        ></TextareaStyled>
        <ButtonStyled type="submit" onClick={handleClick}>
          {type === 'comment' ? 'Submit' : 'Reply'}
        </ButtonStyled>
      </CommentFormContainer>
      {error && (
        <ErrorStyled error={error}>Comment cannot be empty</ErrorStyled>
      )}
    </>
  );
}

const CommentFormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
  position: relative;
  @media (max-width: 650px) {
    padding-bottom: 6rem;
    img {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
    }
  }
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
  @media (max-width: 650px) {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;

const TextareaStyled = styled.textarea`
  flex: 1;
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
