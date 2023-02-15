import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../pages/context/Contexts';

import CommentForm from './CommentForm';
import DeleteModal from './DeleteModal';
import CommentHeader from './CommentHeader';
import Counter from './Counter';
import EditForm from './EditForm';

export default function Comment({
  commentData,
  parentCommentData,
  addReply,
  editComment,
  editReply,
  deleteComment,
  deleteReply,
}) {
  const { id, score, username, createdAt, content, replyingTo } = commentData;
  // const [user] = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOwned, setIsOwned] = useState(false);

  // useEffect(() => {
  //   setIsOwned(user.username == username);
  // }, []);

  function deleteConfirmation(confirmation) {
    if (confirmation) {
      deleteComment ? deleteComment(id) : deleteReply(id, parentId);
    } else {
      setModalOpen(false);
    }
  }

  function submitReply(content) {
    addReply(content, commentData);
    setIsReplying(false);
  }

  function submitCommentEdit(content) {
    editComment(id, { ...commentData, content: content });
    setIsEditing(false);
  }

  function submitReplyEdit(content) {
    editReply(content, id, parentId);
    setIsEditing(false);
  }

  return (
    <>
      <CommentContainer>
        <Counter score={score} />
        <CommentContent>
          <CommentHeader
            username={username}
            createdAt={createdAt}
            isOwner={isOwned}
            setIsReplying={() => setIsReplying((prev) => !prev)}
            setIsEditing={() => setIsEditing((prev) => !prev)}
            deleteRequest={() => setModalOpen(true)}
          />
          {isEditing ? (
            <EditForm
              text={content}
              id={commentData.id}
              onSubmission={editComment ? submitCommentEdit : submitReplyEdit}
            />
          ) : (
            <CommentText>
              {replyingTo && <span>@{replyingTo}&nbsp;</span>}
              <p>{content}</p>
            </CommentText>
          )}
        </CommentContent>
      </CommentContainer>
      {isReplying && (
        <CommentForm
          type="reply"
          id={commentData.id}
          setIsReplying={() => setIsReplying((prev) => !prev)}
          onSubmission={submitReply}
        />
      )}
      {modalOpen && <DeleteModal deleteConfirmation={deleteConfirmation} />}
    </>
  );
}

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  padding: 1.2rem;
  border-radius: 0.5rem;
  margin-left: auto;
  background-color: white;
  width: 100%;
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  flex: 1;
  padding-left: 1.5rem;
  width: 100%;
  @media (max-width: 650px) {
    order: 1;
    padding-left: 0;
    padding-bottom: 1rem;
  }
`;

const CommentText = styled.div`
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
