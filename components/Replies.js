import { useState } from 'react';

import styled from 'styled-components';
import Comment from './Comment';

export default function Replies({ replies }) {
  const [comments, setComments] = useState(replies);
  return (
    <ReplyContainerStyled>
      {comments.map((reply) => (
        <Comment key={reply.id} commentData={reply} />
      ))}
    </ReplyContainerStyled>
  );
}

const ReplyContainerStyled = styled.div`
  width: 94%;
  padding-left: 2rem;
  border-left: 2px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
