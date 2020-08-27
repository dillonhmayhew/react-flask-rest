import React, { useState, useEffect, Component } from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Switch,
  Link
} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>Hello, React.js! - from Flask</h1>
        </div>
        <Switch>
          <Route exact path="/task/:taskID" component={Task} />
        </Switch>
      </Router>
    );
  }
}

const Task = ({match, location}) => {
  const {params: {taskID}} = match;

  let [Task, setTask] = useState({
    uri: "",
    title: "",
    done: false,
    description: ""
  });

  useEffect(() => {
    fetch('/api/tasks/'+taskID).then(res => res.json()).then(data => {
      setTask({
        uri: data.task.uri,
        title: data.task.title,
        done: String(data.task.done),
        description: data.task.description
      });
    });
  }, []);

  return (
    <div>
      {
        Object.keys(Task).map((key, index) => (
          <p key={index}>
            <b>{key}</b>: {Task[key]}
          </p>
        ))
      }
    </div>
  );
}

export default App;
