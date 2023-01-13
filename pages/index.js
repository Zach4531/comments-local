import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import { Fragment, useState } from 'react';
import data from '../public/data.json';

import { UserContext } from './context/Contexts';

import styled from 'styled-components';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import Alert from '../components/Alert';

export default function Home() {
  const [user, setUser] = useState(data.currentUser);
  const [comments, setComments] = useState(data.comments);
  const [scroll, setScroll] = useState(true);
  const [alert, setAlert] = useState({});

  function showAlert(text) {
    setAlert({ show: true, text: text });
    setTimeout(() => {
      setAlert({ show: false, text: '' });
    }, '4000');
  }

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

  function editComment(content, id) {
    const commentsUpdated = comments.map((comment) => {
      if (comment.id === id) {
        comment.content = content;
      }
      return comment;
    });
    setComments(commentsUpdated);
    showAlert('Comment successfully updated!');
  }

  function editReply(content, id, parentId) {
    const commentsUpdated = comments.map((comment) => {
      if (comment.id === parentId) {
        if (comment.replies.length > 0) {
          comment.replies.map((reply) => {
            if (reply.id === id) {
              reply.content = content;
            }
            return reply;
          });
        }
      }
      return comment;
    });
    setComments(commentsUpdated);
    showAlert('Comment successfully updated!');
  }

  function deleteComment(id) {
    const commentsUpdated = comments.filter((comment) => {
      return comment.id !== id;
    });
    setComments(commentsUpdated);
    showAlert('Comment deleted!');
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
    showAlert('Comment deleted!');
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Wrapper>
        {alert.show && <Alert text={alert.text} />}
        {comments.map((comment) => (
          <Fragment key={`${comment.id}`}>
            <Comment
              key={comment.id}
              commentData={comment}
              addReply={addReply}
              editComment={editComment}
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
                    editReply={editReply}
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
