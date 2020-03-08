import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// const client = new ApolloClient({ uri: 'https://nx9zvp49q7.lp.gql.zone/graphql' });
const client = new ApolloClient({
  uri: 'https://api.devcdc.com/cricket',
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    );
  }
}

export default App;
