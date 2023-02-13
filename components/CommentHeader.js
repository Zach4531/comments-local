import styled from 'styled-components';
import Avatar from './Avatar';
import Icon from './Icon';

export default function CommentHeader({
  username,
  createdAt,
  setIsReplying,
  setIsEditing,
  isOwner,
  deleteRequest,
}) {
  return (
    <CommentHeaderContainer>
      <CommentUser>
        <Avatar size="xsmall" img={`./images/avatars/image-${username}.png`} />
        <p className="username">
          {username}
          {isOwner && <span>you</span>}
        </p>
        <p className="date">{createdAt}</p>
      </CommentUser>
      <CommentButtons>
        {isOwner ? (
          <>
            <CommentButton type="delete" onClick={deleteRequest}>
              <Icon text="Delete" icon="delete" />
            </CommentButton>
            <CommentButton onClick={setIsEditing}>
              <Icon text="Edit" icon="edit" />
            </CommentButton>
          </>
        ) : (
          <CommentButton onClick={setIsReplying}>
            <Icon text="Reply" icon="reply" />
          </CommentButton>
        )}
      </CommentButtons>
    </CommentHeaderContainer>
  );
}

const CommentButtons = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 650px) {
    position: absolute;
    right: 1.2rem;
    bottom: 1.6rem;
  }
`;

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  transition: opacity 0.2s ease;
  background-color: transparent;
  border: 0;
  color: ${({ type }) =>
    type === 'delete' ? 'hsl(358, 79%, 66%)' : 'hsl(238, 40%, 52%)'};
  &:hover {
    opacity: 0.5;
  }
  svg {
    transform: scale(0.8);
    margin: -1px 3px 0px 0px;
  }
`;

const CommentHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const CommentUser = styled.div`
  display: flex;
  align-items: center;
  .username {
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0rem 1rem;
  }
  span {
    background: hsl(238, 40%, 52%);
    color: white;
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
    margin-left: 0.2rem;
  }
  .date {
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;
