import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import { useState, createContext, useEffect } from 'react';
import data from '../public/data.json';

import styled from 'styled-components';
import Replies from '../components/Replies';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

const CommentContext = createContext(null);

export { CommentContext };

export default function Home() {
  const [comments, setComments] = useState(data.comments);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (comment) {
      addComment(comment);
    }
  }, [comment]);

  function addComment(comment) {
    if (comment[1]['comment_type'] === 'submit') {
      const commentsUpdated = [...comments, comment[0]];
      setComments(commentsUpdated);
    } else {
      addReply(comment);
    }

    setComment(null);
  }

  function addReply(reply) {
    comments.forEach((comment) => {
      if (comment.id === reply[1]['comment_id']) {
        comment['replies'].push(reply[0]);
        return false;
      }
    });
    setComment(null);
  }

  return (
    <CommentContext.Provider value={[comment, setComment]}>
      <Wrapper>
        {comments.map((comment) => (
          <>
            <Comment key={comment.id} commentData={comment} />
            {comment.replies.length > 0 && (
              <Replies replies={comment.replies} />
            )}
          </>
        ))}
        <CommentForm />
      </Wrapper>
    </CommentContext.Provider>
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
