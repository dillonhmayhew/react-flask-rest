import React from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';
import Task from './components/Task';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/tasks/:taskID" component={Task} />
        </Switch>
      </Router>
    );
  }
}

export default App;
