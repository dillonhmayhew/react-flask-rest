import React from 'react';
import logo from './logo.svg';
import flask from './flask.svg';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>RESTful API from Flask served through React</p> */}
        <img src={logo} className="App-logo" alt="logo" />
        <img src={flask} alt="flask" />
      </header>
    </div>
  );
}

export default Home;