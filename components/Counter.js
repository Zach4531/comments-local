import styled from 'styled-components';
import { useEffect, useState } from 'react';

export default function Counter({ score, updateCounter }) {
  const [count, setCount] = useState(score);
  const [isMounted, setIsMounted] = useState(false);

  function adjustCount(amount) {
    setCount((current) => {
      return current + amount;
    });
  }

  useEffect(() => {
    if (isMounted) {
      updateCounter(count);
    } else {
      setIsMounted(true);
    }
  }, [count]);

  return (
    <CounterStyled>
      <button onClick={() => adjustCount(1)}>+</button>
      <p>{count}</p>
      <button onClick={() => adjustCount(-1)}>-</button>
    </CounterStyled>
  );
}

const CounterStyled = styled.div`
  display: flex;
  padding: 0.2rem 0rem;
  flex-direction: column;
  border-radius: 0.5rem;
  font-weight: bold;
  justify-content: space-around;
  background-color: hsl(228, 33%, 97%);
  width: 40px;
  align-items: center;
  p {
    color: hsl(238, 40%, 52%);
    padding: 0.5rem;
  }

  button {
    font-size: 1.2rem;
    color: hsl(239, 57%, 85%);
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    background: none;
    border: 0;
    padding: 0.2rem 0rem;
    transition: all 0.2s ease;
    &:hover {
      background-color: hsl(239, 67%, 97%);
      color: hsl(238, 40%, 52%);
    }
  }
  @media (max-width: 650px) {
    width: 110px;
    flex-direction: row;
    order: 2;
  }
`;
