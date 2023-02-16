import { Fragment, useState } from 'react';
import {
  getComments,
  addComments,
  deleteComments,
  updateComments,
  getUser,
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
    replies: [],
  };

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

  const addReplyMutaion = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Reply successfully added!');
    },
  });

  const updateReplyMutaion = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Reply successfully updated!');
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

  const deleteReplyMutaion = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      showAlert('Reply successfully deleted!');
    },
  });

  function updateComment(id, content) {
    updateMutaion.mutate({ id: id, content: content });
  }

  function addComment(content) {
    const newComment = Object.assign(CommentObj, {
      content: content,
      username: user.username,
    });
    addMutaion.mutate(newComment);
  }

  function addReply(content, parentComment) {
    const newReply = Object.assign(CommentObj, {
      content: content,
      username: user.username,
      replyingTo: parentComment.username,
    });
    addReplyMutaion.mutate({
      id: parentComment.id,
      content: {
        ...parentComment,
        replies: [...parentComment.replies, newReply],
      },
    });
  }

  function deleteComment(id) {
    deleteMutaion.mutate({ id: id });
  }

  function deleteReply(parentComment) {
    deleteReplyMutaion.mutate({
      id: parentComment.id,
      content: {
        ...parentComment,
      },
    });
  }

  function editReply(content, replyData, parentComment) {
    const newReply = Object.assign(replyData, {
      content: content,
    });

    updateReplyMutaion.mutate({
      id: parentComment.id,
      content: {
        ...parentComment,
        replies: [...parentComment.replies, newReply],
      },
    });
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
                      parentCommentData={comment}
                      deleteReply={deleteReply}
                      editReply={editReply}
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
