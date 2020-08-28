import React, { useState, useEffect} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom';

const Task = ({match, location}) => {
    const {params: {taskID}} = match;
    const columns = [
        {
            Header: "Title",
            accessor: "title",
            width: 250
        },
        {
            Header: "Done",
            accessor: "done",
            width: 100,
            resizable: false
        },
        {
            Header: "Description",
            accessor: "description",
            sortable: false
        }
    ]
  
    const [task, setTask] = useState([{
        title: "",
        done: false,
        description: ""
    }]);

    const [errorStatus, setErrorStatus] = useState(0);
  
    useEffect(() => {
        fetch('/api/tasks/'+taskID, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setErrorStatus(data.status);
            } else {
                setTask([{
                    title: data.task.title,
                    done: String(data.task.done),
                    description: data.task.description
                }]);
            }
        });
    }, []);

    if (errorStatus) return <Redirect to={`/${errorStatus}`} />;
  
    return (
        <ReactTable 
            columns={columns} 
            data={task}>
        </ReactTable>
    );
}

export default Task;