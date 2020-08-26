import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // const [Token, setToken] = useState('');
  let [Tasks, setTasks] = useState({
    uri: "",
    title: "",
    done: false,
    description: ""
  });

  // useEffect(() => {
  //   fetch('/api/token').then(res => res.json()).then(data => {
  //     setToken(data.token);
  //   });
  // }, []);

  useEffect(() => {
    fetch('/api/tasks/1').then(res => res.json()).then(data => {
      setTasks({
        uri: data.task.uri,
        title: data.task.title,
        done: String(data.task.done),
        description: data.task.description
      });
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello, React.js! - from Flask</h1>
        {/* <p>Your token is <code>{Token}</code>.</p> */}
        {
        Object.keys(Tasks).map((key, index) => ( 
          <p><b>{key}</b>: {Tasks[key]}</p> 
        ))
        }
    </div>
  );
}

export default App;
