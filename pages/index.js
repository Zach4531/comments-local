import Head from 'next/head';
// import styles from '../styles/Home.module.css'
import { useState } from 'react';

import styled from 'styled-components';
import AddComment from '../components/AddComment';
import Comments from '../components/Comments';
import MainCard from '../components/MainCard';

export default function Home() {
  return (
    <>
      <Wrapper>
        <Comments />
        <AddComment />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
  width: 650px;
  margin: 1rem auto;
  gap: 1.5rem;
`;
