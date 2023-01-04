import { useState } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

export default function CommentForm({ type = 'submit', onSubmission, id }) {
  const [content, setContent] = useState('');

  const newComment = {
    id: Math.floor(Math.random() * 100) + 5,
    content: content,
    createdAt: '3 weeks ago',
    score: 0,
    username: 'juliusomo',
    currentUser: true,
    replies: [],
  };

  function handleClick() {
    onSubmission(newComment);
    setContent('');
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <FormStyled>
      <Avatar size="medium" avatar={'./images/avatars/image-juliusomo.png'} />
      <TextareaStyled
        name={`comment_name_${id}`}
        id={`comment_${id}`}
        rows="5"
        placeholder={`Add a ${type === 'reply' ? 'Reply' : 'Comment'}...`}
        value={content}
        onChange={handleChange}
      ></TextareaStyled>
      <ButtonStyled type="submit" onClick={handleClick}>
        {type === 'reply' ? 'Reply' : 'Submit'}
      </ButtonStyled>
    </FormStyled>
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
`;

const TextareaStyled = styled.textarea`
  flex: 1;
  border-radius: 0.5rem;
  padding: 1rem;
`;
