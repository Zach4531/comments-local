import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import Counter from '../components/Counter';

export default function Home() {
  return (
    <Wrapper>
      <Counter />
      <Avatar size="small" user="ju" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  *,
  p {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  h1 {
    color: red;
  }
`;
