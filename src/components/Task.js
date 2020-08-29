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
            width: 250,
            sortable: false,
            style:{
                textAlign: "center"
            },
        },
        {
            Header: "Done",
            accessor: "done",
            width: 100,
            sortable: false,
            resizable: false,
            style:{
                textAlign: "center"
            },
        },
        {
            Header: "Description",
            accessor: "description",
            sortable: false,
            style:{
                textAlign: "center"
            },
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
            <TaskForm 
                taskID={taskID}
                title={task[0].title} 
                done={task[0].done} 
                description={task[0].description} 
                bText='Update'
                method='PUT'
            />
            <ReactTable 
                columns={columns} 
                data={task}
                showPagination={false}
                defaultPageSize={task.length}
            />
        </>
    );
}

export default Task;