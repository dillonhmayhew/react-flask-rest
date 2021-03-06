import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';
import { TaskForm } from './';


const Tasks = (props) => {
	const { errorHandler } = props;

    const [tasks, setTasks] = useState([]);
	const [deleted, setDeleted] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [created, setCreated] = useState(false);
	const [showModal, setShowModal] = useState({open: false, selected: ''});
	const [showCreate, setShowCreate] = useState(false);
	
	const handleCreate = () => setCreated(true);
	const handleUpdate = () => setUpdated(true);
	const openUpdateModal = (i) => setShowModal({open: true, selected: i});
	const closeUpdateModal = () => setShowModal({open: false, selected: ''});
	const openCreateModal = () => setShowCreate(true);
	const closeCreateModal = () => setShowCreate(false);

	const formProps = {
		createHandler: handleCreate,
		updateHandler: handleUpdate,
		closeUpdateHandler: closeUpdateModal,
		closeCreateHandler: closeCreateModal
	}
	
	// GET data from API
	useEffect(() => {
		fetch(`/api/tasks`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				errorHandler(data.status);
			} else {
                data.tasks.forEach((task) => task.done = String(task.done));
				setTasks(data.tasks);
				setCreated(false);
				setUpdated(false);
				setDeleted(false);
			}
		});
	}, [created, updated, deleted, errorHandler]);
	
	// DELETE Task
	const deleteTask = (e, id) => {
		e.preventDefault();
		fetch(`/api/tasks/${id}`, {
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
	 
	/* PREPROCCESSING */
	// compile dict of Props, so that the correct Props can be supplied to the TaskForm
	// {taskID: taskObj}
    // const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([key, value], i) => [key, fn(value, key, i)]));
    const formPropsDict = {};
	tasks.forEach((task) => formPropsDict[String(task.id)] = task);

	// generate TaskForm with correct props
	const renderUpdateForm = () => {
		if (showModal.open) {
			return <TaskForm {...formPropsDict[showModal.selected]} {...formProps} {...props} />
		}
	}
	const renderCreateForm = () => {
		if (showCreate) {
			return <TaskForm {...formProps} create={true} {...props} />
		}
	}
	
	// counter for button ids to correspond with correct task
    var c = 0;
	const columns = [
		{
			Header: "Title",
			accessor: "title",
			sortable: false,
			width: 250,
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
			sortable: false,
			resizable: false,
			style:{
				textAlign: "center"
            },
            Cell: () => {
                return (
                    <> 
                    <Button id={tasks[c%tasks.length].id} variant='outline-dark' onClick={(e) => {
                        openUpdateModal(e.target.id);
                    }}
                    >Edit</Button>
                    <Button id={tasks[c++%tasks.length].id} variant='outline-light' onClick={(e)=> {
						deleteTask(e, e.target.id);
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
			
	return (
		<>
			<Button variant='dark' onClick={() => {
				openCreateModal();
			}} id='create'
			>Create Task</Button>
			{renderCreateForm()}
			{renderUpdateForm()}
			<ReactTable 
			columns={columns} 
			data={tasks}
			showPagination={false}
			// getTrProps={getRowIndices}
			// defaultPageSize={100}
			/>
		</>
	);
}

export default Tasks;