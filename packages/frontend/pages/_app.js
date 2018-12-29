// This file is setup to create the actual apollo client
import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import Page from '../components/Page';

class MyApp extends App {
  // this special next.js setup will run first
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    // crawls all the pages and fetches data for return
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    // by returning pageProps here it's exposed for access within render
    return { pageProps };
  }

  render() {
    // little bit of destructuring here
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
// this setup is unecessary for a client side rendered app, but is needed for server-side rendering
// FOR MORE EXAMPLES: read the next.js or apollo documentation
