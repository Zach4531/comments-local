import { useState } from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';

export default function AddReply({ addReply }) {
  const [content, setContent] = useState('');

  const newReply = {
    id: Math.floor(Math.random() * 100) + 5,
    content: content,
    createdAt: '3 weeks ago',
    score: 0,
    username: 'juliusomo',
    currentUser: true,
    replies: [],
  };

  function handleClick() {
    addReply(newReply);
    setContent('');
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <AddReplyStyled>
      <Avatar size="medium" avatar={'./images/avatars/image-juliusomo.png'} />
      <ReplyTextareaStyled
        name="Reply"
        id="Reply"
        rows="5"
        placeholder="Add a Reply..."
        value={content}
        onChange={handleChange}
      ></ReplyTextareaStyled>
      <ReplySubmitStyled type="submit" onClick={handleClick}>
        Reply
      </ReplySubmitStyled>
    </AddReplyStyled>
  );
}

const AddReplyStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
`;

const ReplySubmitStyled = styled.button`
  background-color: hsl(238, 40%, 52%);
  color: #fff;
  border: 0;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const ReplyTextareaStyled = styled.textarea`
  flex: 1;
  border-radius: 0.5rem;
  padding: 1rem;
`;
