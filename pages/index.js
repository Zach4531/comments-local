import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import { Fragment, useState } from 'react';
import data from '../public/data.json';

import { UserContext } from './context/Contexts';

import styled from 'styled-components';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

export default function Home() {
  const [user, setUser] = useState(data.currentUser);
  const [comments, setComments] = useState(data.comments);

  function addComment(content) {
    const newComment = {
      id: Math.floor(Math.random() * 1000) + 5,
      content: content,
      createdAt: '3 weeks ago',
      score: 0,
      username: user.username,
      replies: [],
    };
    const commentsUpdated = [...comments, newComment];
    setComments(commentsUpdated);
  }

  function addReply(content, id) {
    const newReply = {
      id: Math.floor(Math.random() * 1000) + 5,
      content: content,
      createdAt: '3 weeks ago',
      score: 0,
      username: user.username,
    };

    const commentsUpdated = comments.map((comment) => {
      if (comment.id === id) {
        comment.replies = [...comment.replies, newReply];
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

  function deleteReply(id, parentId) {
    const commentsUpdated = comments.map((comment) => {
      if (comment.id === parentId) {
        if (comment.replies.length > 0) {
          comment.replies = comment.replies.filter((reply) => {
            return reply.id !== id;
          });
        }
      }
      return comment;
    });
    setComments(commentsUpdated);
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Wrapper>
        {comments.map((comment) => (
          <Fragment key={`${comment.id}`}>
            <Comment
              key={comment.id}
              commentData={comment}
              addReply={addReply}
              deleteComment={deleteComment}
              parentId={comment.id}
            />
            {comment.replies.length > 0 && (
              <ReplyWrapperStyled>
                {comment.replies.map((reply) => (
                  <Comment
                    key={`${comment.id}-${reply.id}`}
                    commentData={reply}
                    deleteReply={deleteReply}
                    parentId={comment.id}
                  />
                ))}
              </ReplyWrapperStyled>
            )}
          </Fragment>
        ))}
        <CommentForm onSubmission={addComment} type="comment" />
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
