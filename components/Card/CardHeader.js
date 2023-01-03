import styled from 'styled-components';
import Avatar from '../Avatar';
import Reply from '../../public/images/icon-reply.svg';

export default function CardHeader({ username, avatar, createdAt }) {
  return (
    <CardHeaderStyled>
      <CardUserStyled>
        <Avatar size="xsmall" avatar={avatar} />
        <p className="username">{username}</p>
        <p className="date">{createdAt}</p>
      </CardUserStyled>
      <span className="reply">
        <Reply />
        Reply
      </span>
    </CardHeaderStyled>
  );
}

const CardHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  .reply {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    font-weight: bold;
    color: hsl(238, 40%, 52%);
    svg {
      transform: scale(0.8);
      margin: 1px 3px 0px 0px;
    }
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
