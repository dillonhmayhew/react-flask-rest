import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { TaskForm } from './forms';

const Tasks = (props) => {
    const [tasks, setTasks] = useState([]);
	const [errorStatus, setErrorStatus] = useState(0);
	const [deleted, setDeleted] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [showModal, setShowModal] = useState({});
	
	const handleForm = () => setUpdated(true);
	const childErrorStatus = (err) => setErrorStatus(err)
	const openEditModal = (key) => {
        showModal[key] = true;
        setShowModal(showModal);
    }
	const closeEditModal = (key) => {
        showModal[key] = false;
        setShowModal(showModal);
    }
    
    var c = 0;
	const columns = [
		{
			Header: "Title",
			accessor: "title",
			width: 250,
			style:{
				textAlign: "center"
			},
		},
		{
			Header: "Done",
			accessor: "done",
			width: 100,
			resizable: false,
			style:{
				textAlign: "center"
			},
		},
		{
			Header: "Description",
			accessor: "description",
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
            Cell: () => {
                return (
                    <>
                    <Button id={c} variant='outline-dark' onClick={(e) => {
                        // console.log(e.target.id);
                        openEditModal(e.target.id);
                    }}
                    >Edit</Button>
                    <Button id={c++} variant='outline-light' onClick={(e)=> {
                        console.log(e.target.id);    // deleteTask(e);
                    }}
                    >Delete</Button>
                    </>
                )
            },
            width: 150,
            maxWidth: 150,
            minWidth: 150
        }
    ]

	const formProps = {
		id: 0,
		title: '', 
		done: '', 
		description: ''
		// handlerForm: handleForm,
		// formError: childErrorStatus
    }
     
    // const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([key, value], i) => [key, fn(value, key, i)]));
    const formPropsList = [];
    var obj = {};
    for (var i=0; i<tasks.length; i++) {
        for (var j=0; j<4; j++) {
            obj[[Object.keys(formProps)[j]]] = Object.values(tasks[i])[j];
        }
        formPropsList.push(obj);
        obj = {};
    }

    // pre processing
    for (var i=0; i<tasks.length; i++) {
        showModal[tasks[i].id] = false;
    }
	
	const modalProps = {
		handlerModal: closeEditModal
	}
	
	// GET data from API
	useEffect(() => {
		fetch(`/api/tasks`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				setErrorStatus(data.status);
			} else {
                data.tasks.forEach((task) => task.done = String(task.done));
				setTasks(data.tasks);
				setUpdated(false);
				setDeleted(false);
			}
		});
    }, [updated, deleted]);

	// DELETE Task
	// const deleteTask = (e) => {
	// 	e.preventDefault();
	// 	fetch(`/api/tasks/${taskID}`, {
	// 		method: 'DELETE'
	// 	})
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		if (data.error) {
	// 			setErrorStatus(data.status);
	// 		} else {
	// 			setDeleted(data.result);
	// 		}
	// 	});
    // }

    const items = [];
    for (var i=0; i<tasks.length; i++) {
        if (showModal[tasks[i].id]) {
            items.push(<TaskForm {...modalProps} {...formPropsList[i]} />)
        }
    }

	
	if (errorStatus) return <Redirect to={`/${errorStatus}`} />;
	if (deleted) return <Redirect to='/tasks' />;
			
	return (
		<>
			{showModal['1'] && <TaskForm {...modalProps} {...formPropsList[1]} />}
			<ReactTable 
			columns={columns} 
			data={tasks}
			defaultPageSize={10}
			/>
		</>
	);
}

export default Tasks;