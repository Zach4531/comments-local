import '../styles/globals.css';
import { useState } from 'react';
import UserLogin from '../components/UserLogin';
import Head from 'next/head';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }) {
  const [login, setLogin] = useState(true);
  const queryClient = new QueryClient();

  function authenticateUser() {
    setLogin(true);
  }
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/35671f3e68.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      {login ? (
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      ) : (
        <Container>
          <UserLogin authenticate={authenticateUser} />
        </Container>
      )}
    </>
  );
}

export default MyApp;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: hsl(228, 33%, 97%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
