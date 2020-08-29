import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom';
import { TaskForm } from './forms'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

const Task = (props) => {
    const {params: {taskID}} = props.match;
  
    const [task, setTask] = useState([{}]);
    const [errorStatus, setErrorStatus] = useState(0);
    const [deleted, setDeleted] = useState(false);
    const [update, setUpdate] = useState(false);

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
            resizable: false,
            style:{
                textAlign: "center"
            },
        },
        {
          Header: "Actions",
          filterable: false,
          sortable: false,
          resizable: false,
          style:{
            textAlign: "center"
            },
          Cell: () =>{
            return(
                <>
                <Button variant='outline-dark' onClick={(e)=> {
                    alert("update button"); // open update modal with form
                }}
                >Edit</Button>
                <Button variant='outline-light' onClick={()=> {
                        handleDelete()
                    }}
                >Delete</Button>
                </>
          )},
          width: 150,
          maxWidth: 150,
          minWidth: 150,
        }
    ]
    
    // GET data from API
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
                setUpdate(false);
            }
        });
    }, [taskID, update]);

    const handleDelete = (e) => {
        // e.preventDefault();
        fetch(`/api/tasks/${taskID}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setErrorStatus(data.status);
            } else {
                setDeleted(data.result);
            }
        });
    }

    const handleForm = () => {
        setUpdate(true);
    }

    if (errorStatus) return <Redirect to={`/${errorStatus}`} />;
    if (deleted) return <Redirect to='/tasks' />;
  
    return (
        <>
            <TaskForm 
                taskID={taskID}
                title={task[0].title} 
                done={task[0].done} 
                description={task[0].description} 
                bText='Update'
                method='PUT'
                handler={handleForm}
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