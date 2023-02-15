import styled, { keyframes } from 'styled-components';

export default function Loader() {
  return <LoaderStyled></LoaderStyled>;
}

const loaderAnimation = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
 /* 0% { border-width: 0px; }
 50% { border-width: 37px; }
 100% { border-width: 0px; } */

`;

const LoaderStyled = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: 0 auto;
  border: 8px solid hsl(228, 33%, 87%);
  /* background-color: hsl(238, 40%, 52%); */
  border-top: 8px solid hsl(238, 40%, 52%);
  /* border-bottom: 8px solid hsl(238, 40%, 52%); */
  width: 75px;
  height: 75px;
  border-radius: 50%;
  animation: ${loaderAnimation} 1s linear infinite;
`;
