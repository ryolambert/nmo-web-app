// gives a high-order component that exposes the client via a prop
import withApollo from 'next-with-apollo';
// apollo-boost package that has all of your standard installation
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    // current url endpoint defined as localhost:7777 will change for deployment
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    // basically an express.js middleware to identify and keep the cookies holding credentials for things like login, etc.
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
