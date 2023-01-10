import { useState, useContext } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

export default function CommentForm({
  type = 'submit',
  id,
  setVisibility,
  username,
  getContent,
}) {
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  const newComment = [
    {
      id: Math.floor(Math.random() * 100) + 5,
      content: content,
      createdAt: '3 weeks ago',
      score: 0,
      username: 'juliusomo',
      currentUser: true,
      replies: [],
      parentUser: username,
    },
    { comment_id: id, comment_type: type },
  ];
  function handleClick() {
    if (hasContent(content)) {
      setError(true);
      return;
    }
    getContent(newComment);
    setContent('');
    setError(false);

    if (type === 'reply') setVisibility();
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  function hasContent(content) {
    return content.trim() === '';
  }

  return (
    <>
      <FormStyled>
        <Avatar size="medium" img={'./images/avatars/image-juliusomo.png'} />
        <TextareaStyled
          name={`comment_name_${id}`}
          id={`comment_${id}`}
          rows="5"
          placeholder={`Add a ${type === 'reply' ? 'Reply' : 'Comment'}...`}
          value={content}
          onChange={handleChange}
          error={error}
        ></TextareaStyled>
        <ButtonStyled type="submit" onClick={handleClick}>
          {type === 'reply' ? 'Reply' : 'Submit'}
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
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
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
  border-radius: 0.5rem;
  padding: 1rem;
  border: 2px solid ${(props) => (props.error ? 'red' : '#ccc')};
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
