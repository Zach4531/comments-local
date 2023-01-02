import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import styled from 'styled-components';
import Comments from '../components/Comments';
import MainCard from '../components/MainCard';

export default function Home() {
  return (
    <>
      <Wrapper>
        <Comments />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
