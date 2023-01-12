import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../pages/context/Contexts';

import CommentForm from './CommentForm';
import DeleteModal from './DeleteModal';

import CommentHeader from './Card/CommentHeader';
+65;
import Counter from './Counter';
import EditForm from './EditForm';

export default function Comment({
  commentData,
  addReply,
  editComment,
  editReply,
  deleteComment,
  deleteReply,
  parentId,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOwned, setIsOwned] = useState(false);
  const { id, score, username, createdAt, content, replyingTo } = commentData;
  const [user] = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    setIsOwned(user.username == username);
  }, []);

  function deleteRequest() {
    setModalOpen(true);
  }

  function editRequest() {
    setEdit(!edit);
  }

  function deleteConfirmation(confirmation) {
    if (confirmation) {
      deleteComment ? deleteComment(id) : deleteReply(id, parentId);
    } else {
      setModalOpen(false);
    }
  }

  function submitReply(content) {
    addReply(content, parentId);
    setIsVisible(false);
  }

  function submitCommentEdit(content) {
    editComment(content, id);
    setEdit(false);
  }

  function submitReplyEdit(content) {
    editReply(content, id, parentId);
    setEdit(false);
  }

  return (
    <>
      <CommentStyled>
        <Counter score={score} />
        <CommentContentStyled>
          <CommentHeader
            username={username}
            img={`./images/avatars/image-${username}.png`}
            createdAt={createdAt}
            setVisibility={toggleVisibility}
            isOwner={isOwned}
            deleteRequest={deleteRequest}
            editRequest={editRequest}
          />
          {edit ? (
            <EditForm
              text={content}
              id={commentData.id}
              onSubmission={editComment ? submitCommentEdit : submitReplyEdit}
            />
          ) : (
            <CommentBodyStyled>
              {replyingTo && <span>@{replyingTo}&nbsp;</span>}
              <p>{content}</p>
            </CommentBodyStyled>
          )}
        </CommentContentStyled>
      </CommentStyled>
      {isVisible && (
        <CommentForm
          type="reply"
          id={commentData.id}
          setVisibility={toggleVisibility}
          onSubmission={submitReply}
        />
      )}
      {modalOpen && <DeleteModal deleteConfirmation={deleteConfirmation} />}
    </>
  );
}

const CommentStyled = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  border-radius: 0.5rem;
  margin-left: auto;
  background-color: white;
  width: 100%;
`;

const CommentContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  flex: 1;
  padding-left: 1.5rem;
`;

const CommentBodyStyled = styled.div`
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
