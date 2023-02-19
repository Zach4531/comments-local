import { Fragment, useState } from 'react';
import {
  getComments,
  getUser,
  addComments,
  addReplies,
  updateComments,
  updateReplies,
  deleteComments,
  deleteReplies,
} from '../public/api/comments';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import styled from 'styled-components';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import { UserContext } from '../public/context/UserContext';

export default function Home() {
  const [alert, setAlert] = useState({});
  const queryClient = useQueryClient();

  const CommentObj = {
    id: Math.floor(Math.random() * 1000) + 5,
    createdAt: new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    score: 0,
  };

  const { data: comments, isLoading: commentsLoading } = useQuery(
    'comments',
    getComments
  );

  const { data: user, isLoading: userLoading } = useQuery('user', getUser);

  const addCommentMutaion = useMutation(addComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Comment successfully added!');
    },
  });

  const updateCommentMutaion = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Comment successfully updated!');
    },
  });

  const addReplyMutaion = useMutation(addReplies, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Reply successfully added!');
    },
  });

  const updateReplyMutaion = useMutation(updateReplies, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Reply successfully updated!');
    },
  });

  const deleteCommentMutaion = useMutation(deleteComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Comment successfully deleted!');
    },
  });

  const deleteReplyMutaion = useMutation(deleteReplies, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Reply successfully deleted!');
    },
  });

  function addComment(content) {
    const newComment = Object.assign(CommentObj, {
      content: content,
      username: user.username,
    });
    addCommentMutaion.mutate(newComment);
  }

  function addReply(content, parentComment) {
    const newReply = Object.assign(CommentObj, {
      commentId: parentComment.id,
      content: content,
      username: user.username,
      replyingTo: parentComment.replyingTo,
    });
    addReplyMutaion.mutate(newReply);
  }

  function updateComment(id, content) {
    updateCommentMutaion.mutate({ id: id, content: content });
  }

  function updateReply(id, content) {
    updateReplyMutaion.mutate({ id: id, content: content });
  }

  function deleteComment(id) {
    deleteCommentMutaion.mutate({ id: id });
  }

  function deleteReply(id) {
    deleteReplyMutaion.mutate({ id: id });
  }

  function showAlert(text) {
    setAlert({ show: true, text: text });
    setTimeout(() => {
      setAlert({ show: false, text: '' });
    }, '4000');
  }

  if (commentsLoading || userLoading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={user}>
      {comments && (
        <Wrapper>
          {alert.show && <Alert text={alert.text} />}
          {comments.map((comment) => (
            <Fragment key={`${comment.id}`}>
              <Comment
                key={comment.id}
                commentData={comment}
                addReply={addReply}
                updateComment={updateComment}
                deleteComment={deleteComment}
                parentId={comment.id}
              />
              {comment.replies.length > 0 && (
                <ReplyWrapperStyled>
                  {comment.replies.map((reply) => (
                    <Comment
                      key={`${comment.id}-${reply.id}`}
                      commentData={reply}
                      parentCommentData={comment}
                      deleteReply={deleteReply}
                      updateReply={updateReply}
                    />
                  ))}
                </ReplyWrapperStyled>
              )}
            </Fragment>
          ))}
          <CommentForm onSubmission={addComment} type="comment" />
        </Wrapper>
      )}
    </UserContext.Provider>
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
