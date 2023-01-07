import styled from 'styled-components';
import Avatar from '../Avatar';
import Reply from '../../public/images/icon-reply.svg';
import Delete from '../../public/images/icon-delete.svg';
import { useContext } from 'react';
import { UserContext } from '../../pages/context/Contexts';

export default function CommentHeader({
  username,
  avatar,
  createdAt,
  toggleReply,
}) {
  function handleClick() {
    toggleReply();
  }

  const [user] = useContext(UserContext);

  return (
    <CardHeaderStyled>
      <CardUserStyled>
        <Avatar size="xsmall" avatar={avatar} />
        <p className="username">{username}</p>
        <p className="date">{createdAt}</p>
      </CardUserStyled>
      <CardButtonsStyled>
        {user.username === username && (
          <CommentButtonStyled type="delete" onClick={handleClick}>
            <Delete />
            Delete
          </CommentButtonStyled>
        )}
        <CommentButtonStyled type="reply" onClick={handleClick}>
          <Reply />
          Reply
        </CommentButtonStyled>
      </CardButtonsStyled>
    </CardHeaderStyled>
  );
}

const CardButtonsStyled = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const CommentButtonStyled = styled.button`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  transition: opacity 0.2s ease;
  background-color: transparent;
  border: 0;
  color: ${(props) => (props.type === 'delete' ? 'red' : 'hsl(238, 40%, 52%)')};
  &:hover {
    opacity: 0.5;
  }
  svg {
    transform: scale(0.8);
    margin: -1px 3px 0px 0px;
  }
`;

const CardHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const CardUserStyled = styled.div`
  display: flex;
  align-items: center;
  .username {
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0rem 1rem;
  }

  .date {
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;
