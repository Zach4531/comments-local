import styled, { keyframes } from 'styled-components';

export default function Alert({ text }) {
  return <AlertStyled>{text}</AlertStyled>;
}

const alertAnimation = keyframes`
 0% { opacity: 0; }
 50% { opacity: 1; }
 100% { opacity: 0; }
`;

const AlertStyled = styled.p`
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  background: green;
  color: white;
  font-weight: bold;
  width: 100%;
  max-width: 600px;
  border-radius: 0.5rem;
`;
