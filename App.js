import React from 'react';
import Router from './config/Router'
let apiKeys = require('./bing-key.json');



export default class App extends React.Component {
  render() {

    // console.log('api key', apiKeys["bing-key"])
    return (
      <Router />
    );
  }
}