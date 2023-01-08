import { useState } from 'react';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import CommentHeader from './Card/CommentHeader';
+65;
import Counter from './Counter';

export default function Comment({ commentData }) {
  const [replyOpen, setReplyOpen] = useState(false);

  function toggleReply() {
    setReplyOpen(!replyOpen);
  }

  return (
    <>
      <CommentStyled>
        <Counter score={commentData.score} />
        <CommentContentStyled>
          <CommentHeader
            size="xsmall"
            username={commentData.username}
            avatar={`./images/avatars/image-${commentData.username}.png`}
            createdAt={commentData.createdAt}
            toggleReply={toggleReply}
          />
          <CommentBodyStyled>
            {commentData.parentUser && (
              <span>@{commentData.parentUser}&nbsp;</span>
            )}

            <p>{commentData.content}</p>
          </CommentBodyStyled>
        </CommentContentStyled>
      </CommentStyled>
      {replyOpen && (
        <CommentForm
          type="reply"
          id={commentData.id}
          toggleReply={toggleReply}
          user={commentData.username}
        />
      )}
    </>
  );
}

const CommentStyled = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  border-radius: 0.5rem;
  margin-left: auto;
  background-color: white;
  width: 100%;
`;

const CommentContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  flex: 1;
  padding-left: 1.5rem;
`;

const CommentBodyStyled = styled.div`
  padding-top: 1rem;
  p {
    opacity: 0.7;
    display: inline;
  }
  span {
    color: hsl(238, 40%, 52%);
    opacity: 1;
    font-weight: bold;
  }
`;
