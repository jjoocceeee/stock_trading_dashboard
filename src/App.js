import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import RenderDashboard from './Dashboard';
import Universe from "./Universe";

const client = new ApolloClient({
  uri: 'https://seniorprojectu.herokuapp.com/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12" style={{height: '500px'}}>
                {Universe.map(function(ticker) {
                  return <RenderDashboard key={ticker.ticker} ticker={ticker.ticker}/>
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </ApolloProvider>
  );
}

export default App;
