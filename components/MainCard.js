import styled from 'styled-components';
import CardHeader from './Card/CardHeader';
import Counter from './Counter';

export default function MainCard({
  score,
  avatar,
  username,
  createdAt,
  content,
}) {
  return (
    <MainCardStyled>
      <Counter score={score} />
      <CardContentStyled>
        <CardHeader
          size="xsmall"
          username={username}
          avatar={avatar}
          createdAt={createdAt}
        />
        <CardBodyStyled>{content}</CardBodyStyled>
      </CardContentStyled>
    </MainCardStyled>
  );
}

const MainCardStyled = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  margin: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  width: 650px;
`;

const CardContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  flex: 1;
  padding-left: 1.5rem;
`;

const CardBodyStyled = styled.p`
  opacity: 0.7;
  padding-top: 1rem;
`;
