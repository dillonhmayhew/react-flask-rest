import React, { useState, useEffect} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';

const Task = ({match, location}) => {
    const {params: {taskID}} = match;
    const columns = [
      {
        Header: "URI",
        accessor: "uri"
      },
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Done",
        accessor: "done"
      },
      {
        Header: "Description",
        accessor: "description"
      }
    ]
  
    let [task, setTask] = useState([{
      uri: "",
      title: "",
      done: false,
      description: ""
    }]);
  
    useEffect(() => {
      fetch('/api/tasks/'+taskID).then(res => res.json()).then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setTask([{
            uri: data.task.uri,
            title: data.task.title,
            done: String(data.task.done),
            description: data.task.description
          }]);
        }
      });
    }, []);
  
    return (
        <ReactTable columns={columns} data={task}>
          
        </ReactTable>
      // <div>
      //   <table>
      //     <tbody>
      //       {
      //         Object.keys(Task).map((key, index) => (
      //           <tr key={index}>
      //             <td><b>{key}</b></td>
      //             <td>{Task[key]}</td>
      //           </tr>
      //         ))
      //       }
      //     </tbody>
      //   </table>
      // </div>
    );
  }

  export default Task;