import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import { useState } from 'react';
import data from '../public/data.json';

import styled from 'styled-components';
import Replies from '../components/Replies';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

export default function Home() {
  const [comments, setComments] = useState(data.comments);

  function addComment(newComment) {
    const commentsUpdated = [...comments, newComment];
    setComments(commentsUpdated);
  }

  function addReply(newReply) {}

  return (
    <Wrapper>
      {comments.map((comment) => (
        <>
          <Comment key={comment.id} commentData={comment} />
          {comment.replies.length > 0 && (
            <Replies replies={comment.replies} addReply={addReply} />
          )}
        </>
      ))}
      <CommentForm onSubmission={addComment} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
  width: 650px;
  margin: 1rem auto;
  gap: 1.5rem;
`;
