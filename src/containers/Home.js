import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Query query={gql`
      query {
        schedule(
          type: "ALL",
          status: "upcoming",
          page: 0
          ) {
            seriesName
          } 
      }
      `}>
      {({ loading, error, data }) => {
        console.log(data, loading)
        if (loading) return <p>Good things take time....</p>
        if (error) return <p>Something went wrong...</p>
        return (
          <div>
            <header className='tc pv4 pv5-ns'>
              <h1 className='f5 f4-ns fw6 mid-gray'>Jasper Whitehouse</h1>
              <h2 className='f6 gray fw2 ttu tracked'>Los Angeles</h2>
            </header>
          </div>
        );
      }}
    </Query>
    )
  }
}

export default Home;
