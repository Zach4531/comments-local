import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import { Fragment, useEffect, useState } from 'react';
import {
  getComments,
  addComments,
  getUser,
  deleteComments,
  updateComments,
} from '../public/api/comments';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import styled from 'styled-components';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import Alert from '../components/Alert';
import Loader from '../components/Loader';

export default function Home() {
  const [alert, setAlert] = useState({});
  const queryClient = useQueryClient();

  //   const newComment = {
  //     id: Math.floor(Math.random() * 1000) + 5,
  //     content: content,
  //     createdAt: '3 weeks ago',
  //     score: 0,
  //     username: user.username,
  //     replies: [],
  //   };

  const { data: comments, isLoading: commentsLoading } = useQuery(
    'comments',
    getComments
  );

  const { data: user, isLoading: userLoading } = useQuery('user', getUser);

  const addMutaion = useMutation(addComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Comment successfully added!');
    },
  });

  const updateMutaion = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Comment successfully updated!');
    },
  });

  const deleteMutaion = useMutation(deleteComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Comment successfully deleted!');
    },
  });

  function updateComment(id, content) {
    updateMutaion.mutate({ id: id, content: content });
  }

  function addComment(content) {
    addMutaion.mutate({ content: content, username: user.username });
  }

  function deleteComment(id) {
    deleteMutaion.mutate({ id: id });
  }

  function updateData(data) {
    setComments(data);
    localStorage.setItem(
      'frontEndComments',
      JSON.stringify({ currentUser: user, comments: data })
    );
  }

  function showAlert(text) {
    setAlert({ show: true, text: text });
    setTimeout(() => {
      setAlert({ show: false, text: '' });
    }, '4000');
  }

  function addReply(content, id, replyingTo) {
    const newReply = {
      id: Math.floor(Math.random() * 1000) + 5,
      content: content,
      createdAt: '3 weeks ago',
      score: 0,
      replyingTo: replyingTo,
      username: user.username,
    };

    const commentsUpdated = comments.map((comment) => {
      if (comment.id === id) {
        comment.replies = [...comment.replies, newReply];
      }
      return comment;
    });
    updateData(commentsUpdated);
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
    updateData(commentsUpdated);
    showAlert('Comment successfully updated!');
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
    updateData(commentsUpdated);
    showAlert('Comment deleted!');
  }

  if (commentsLoading || userLoading) {
    return <Loader />;
  }

  return (
    <>
      {comments && (
        <Wrapper>
          {alert.show && <Alert text={alert.text} />}
          {comments.map((comment) => (
            <Fragment key={`${comment.id}`}>
              <Comment
                key={comment.id}
                commentData={comment}
                addReply={addReply}
                editComment={updateComment}
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
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
  width: 100%;
  max-width: 650px;
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
  @media (max-width: 650px) {
    width: 100%;
    padding-left: 0;
    border: 0;
  }
`;
