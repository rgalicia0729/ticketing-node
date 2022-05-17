import 'bootstrap/dist/css/bootstrap.min.css';

import { buildClient } from '../api/build-client';

function AppComponent({ Component, pageProps }) {
  return (
    <>
      <h1>Header!</h1>
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return data
};

export default AppComponent;
