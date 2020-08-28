import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom';
import { TaskForm } from './forms'

const Task = ({match}) => {
    const {params: {taskID}} = match;
  
    const [task, setTask] = useState([{}]);
    const [errorStatus, setErrorStatus] = useState(0);
    // const [method, setMethod] = useState('GET');

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
  
    useEffect(() => {
        fetch(`/api/tasks/${taskID}`, {
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
        <>
            <TaskForm />
            <ReactTable 
                columns={columns} 
                data={task}>
            </ReactTable>
            <button 
                type="button"
                onClick={() => alert("CLICKED")}
            >
                Click Me!
            </button>
        </>
    );
}

const useHTTPMethod = (id, method) => {
    return [method, id];
}

export default Task;