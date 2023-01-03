import { useState } from 'react';
import styled from 'styled-components';
import AddReply from './AddReply';
import CardHeader from './Card/CardHeader';
import Counter from './Counter';

export default function MainCard({ commentData }) {
  const [replyOpen, setReplyOpen] = useState(false);

  function toggleReply() {
    setReplyOpen(!replyOpen);
  }

  return (
    <>
      <MainCardStyled>
        <Counter score={commentData.score} />
        <CardContentStyled>
          <CardHeader
            size="xsmall"
            username={commentData.username}
            avatar={`./images/avatars/image-${commentData.username}.png`}
            createdAt={commentData.createdAt}
            toggleReply={toggleReply}
          />
          <CardBodyStyled>{commentData.content}</CardBodyStyled>
        </CardContentStyled>
      </MainCardStyled>
      {replyOpen && <AddReply />}
    </>
  );
}

const MainCardStyled = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  border-radius: 0.5rem;
  margin-left: auto;
  background-color: white;
  width: 100%;
`;

const CardContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  flex: 1;
  padding-left: 1.5rem;
`;

const CardBodyStyled = styled.p`
  opacity: 0.7;
  padding-top: 1rem;
`;
