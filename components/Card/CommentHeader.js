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
          <span className="delete" onClick={handleClick}>
            <Delete />
            Delete
          </span>
        )}
        <span className="reply" onClick={handleClick}>
          <Reply />
          Reply
        </span>
      </CardButtonsStyled>
    </CardHeaderStyled>
  );
}

const CardHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  span {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    font-weight: bold;
    svg {
      transform: scale(0.8);
      margin: -1px 3px 0px 0px;
    }
  }
  .reply {
    color: hsl(238, 40%, 52%);
  }
  .delete {
    color: red;
  }
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

const CardButtonsStyled = styled.div`
  display: flex;
  gap: 1.5rem;
`;
