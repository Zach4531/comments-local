import '../styles/globals.css';
import { useState } from 'react';
import UserLogin from '../components/UserLogin';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [login, setLogin] = useState(false);

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
        <Component {...pageProps} />
      ) : (
        <UserLogin authenticate={authenticateUser} />
      )}
    </>
  );
}

export default MyApp;
