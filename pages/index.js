import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import { useState, createContext, useEffect } from 'react';
import data from '../public/data.json';

import { UserContext } from './context/Contexts';

import styled from 'styled-components';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

export default function Home() {
  const [user, setUser] = useState(data.currentUser);
  const [comments, setComments] = useState(data.comments);

  function addComment(comment) {
    const commentsUpdated = [...comments, comment[0]];
    setComments(commentsUpdated);
  }

  function addReply(reply) {
    const commentsUpdated = comments.map((comment) => {
      if (comment.id === reply[1].comment_id) {
        comment.replies = [...comment.replies, reply[0]];
      }
      return comment;
    });
    setComments(commentsUpdated);
  }

  function deleteComment(id) {
    const commentsUpdated = comments.filter((comment) => {
      return comment.id !== id;
    });
    setComments(commentsUpdated);
  }

  function deleteReply(id) {
    alert('la');
    // const commentsUpdated = comments.filter((comment) => {
    //   return comment.id !== id;
    // });
    // setComments(commentsUpdated);
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Wrapper>
        {comments.map((comment) => (
          <>
            <Comment
              key={comment.id}
              commentData={comment}
              addReply={addReply}
              deleteComment={deleteComment}
            />
            {comment.replies.length > 0 && (
              <ReplyWrapperStyled>
                {comment.replies.map((reply) => (
                  <Comment
                    key={`reply_${comment.id}`}
                    commentData={reply}
                    deleteComment={deleteReply}
                  />
                ))}
              </ReplyWrapperStyled>
            )}
          </>
        ))}
        <CommentForm addComment={addComment} />
      </Wrapper>
    </UserContext.Provider>
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

const ReplyWrapperStyled = styled.div`
  width: 94%;
  padding-left: 2rem;
  border-left: 2px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
