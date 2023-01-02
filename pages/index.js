import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import styled from 'styled-components';

export default function Home() {
  return (
    <Wrapper>
      <h1>Hello</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  h1 {
    color: red;
  }
`;
