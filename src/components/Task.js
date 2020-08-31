import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';
import { TaskForm } from './forms';

const Task = (props) => {
	const {params: {taskID}} = props.match;
	
	const [task, setTask] = useState([{}]);
	const [errorStatus, setErrorStatus] = useState(0);
	const [deleted, setDeleted] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [showModal, setShowModal] = useState(false);
	
	const handleForm = () => setUpdated(true);
	const childErrorStatus = (err) => setErrorStatus(err)
	const openEditModal = () => setShowModal(true);
	const closeEditModal = () => setShowModal(false);
		
	const formProps = {
		id: taskID,
		title: task[0].title, 
		done: task[0].done, 
		description: task[0].description
	}

	const funcProps = {
		handlerForm: handleForm,
		formError: childErrorStatus,
		handlerModal: closeEditModal
	}
	
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
				data.task.done = String(data.task.done);
				setTask([data.task]);
				setUpdated(false);
				setDeleted(false);
			}
		});
	}, [taskID, updated, deleted]);
	
	// DELETE Task
	const deleteTask = (e) => {
		e.preventDefault();
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
			Cell: () => {
				return (
					<>
					<Button variant='outline-dark' onClick={() => {
						openEditModal();
					}}
					>Edit</Button>
					<Button variant='outline-light' onClick={(e)=> {
						deleteTask(e);
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
	
	if (errorStatus) window.location.pathname = `/${errorStatus}`;
	if (deleted) window.location.pathname = '/tasks';
			
	return (
		<>
			{showModal && <TaskForm {...funcProps} {...formProps} />}
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