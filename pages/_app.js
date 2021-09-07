import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { ParkContextProvider } from '../src/store/park-context';

function MyApp({ Component, pageProps }) {
  return (
    <ParkContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ParkContextProvider>
  );
}

export default MyApp;
