import { useState } from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';

export default function AddComment({ addComment }) {
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
    addComment(newComment);
    setContent('');
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <AddCommentStyled>
      <Avatar size="medium" avatar={'./images/avatars/image-juliusomo.png'} />
      <CommentTextareaStyled
        name="comment"
        id="comment"
        rows="5"
        placeholder="Add a Comment..."
        value={content}
        onChange={handleChange}
      ></CommentTextareaStyled>
      <CommentSubmitStyled type="submit" onClick={handleClick}>
        Submit
      </CommentSubmitStyled>
    </AddCommentStyled>
  );
}

const AddCommentStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
`;

const CommentSubmitStyled = styled.button`
  background-color: hsl(238, 40%, 52%);
  color: #fff;
  border: 0;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const CommentTextareaStyled = styled.textarea`
  flex: 1;
  border-radius: 0.5rem;
  padding: 1rem;
`;
