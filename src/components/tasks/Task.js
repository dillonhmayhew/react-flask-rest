import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';
import { TaskForm } from './';

const Task = (props) => {
	const {params: {taskID}} = props.match;
	const { errorHandler } = props;
	
	const [task, setTask] = useState([{}]);
	const [deleted, setDeleted] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [showModal, setShowModal] = useState(false);
	
	const handleUpdate = () => setUpdated(true);
	const openUpdateModal = () => setShowModal(true);
	const closeUpdateModal = () => setShowModal(false);
		
	const formProps = {
		id: taskID,
		title: task[0].title, 
		done: task[0].done, 
		description: task[0].description,
		updateHandler: handleUpdate,
		closeUpdateHandler: closeUpdateModal
	}
	
	// GET data from API
	useEffect(() => {
		fetch(`/api/tasks/${taskID}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				errorHandler(data.status);
			} else {
				data.task.done = String(data.task.done);
				setTask([data.task]);
				setUpdated(false);
				setDeleted(false);
			}
		});
	}, [taskID, updated, deleted, errorHandler]);
	
	// DELETE Task
	const deleteTask = (e) => {
		e.preventDefault();
		fetch(`/api/tasks/${taskID}`, {
			method: 'DELETE'
		})
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				errorHandler(data.status);
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
						openUpdateModal();
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
	
	if (deleted) window.location.pathname = '/tasks';
			
	return (
		<>
			{showModal && <TaskForm {...formProps} {...props} />}
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