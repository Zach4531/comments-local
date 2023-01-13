import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../pages/context/Contexts';

import Reply from '../public/images/icon-reply.svg';
import Delete from '../public/images/icon-delete.svg';
import Edit from '../public/images/icon-edit.svg';

import CommentForm from './CommentForm';
import DeleteModal from './DeleteModal';
import CommentHeader from './CommentHeader';
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
    addReply(content, parentId, username);
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
        <CardButtonsStyled>
          {isOwned ? (
            <>
              <CommentButtonStyled type="delete" onClick={deleteRequest}>
                <Delete />
                Delete
              </CommentButtonStyled>
              <CommentButtonStyled onClick={editRequest}>
                <Edit />
                Edit
              </CommentButtonStyled>
            </>
          ) : (
            <CommentButtonStyled onClick={toggleVisibility}>
              <Reply />
              Reply
            </CommentButtonStyled>
          )}
        </CardButtonsStyled>
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
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const CommentContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  flex: 1;
  padding-left: 1.5rem;
  @media (max-width: 650px) {
    order: 1;
    padding-left: 0;
    padding-bottom: 1rem;
  }
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

const CardButtonsStyled = styled.div`
  display: flex;
  gap: 1rem;
  @media (min-width: 650px) {
    display: none;
  }
`;

const CommentButtonStyled = styled.button`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  transition: opacity 0.2s ease;
  background-color: transparent;
  border: 0;
  color: ${(props) =>
    props.type === 'delete' ? 'hsl(358, 79%, 66%)' : 'hsl(238, 40%, 52%)'};
  &:hover {
    opacity: 0.5;
  }
  svg {
    transform: scale(0.8);
    margin: -1px 3px 0px 0px;
  }
`;
