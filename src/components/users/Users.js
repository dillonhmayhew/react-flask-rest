import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';
import { UserForm } from './';

const Users = (props) => {
	const { errorHandler } = props;

    const [users, setUsers] = useState([]);
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
		fetch(`/api/users`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				errorHandler(data.status);
			} else {
				setUsers(data.users);
				setCreated(false);
				setUpdated(false);
				setDeleted(false);
			}
		});
	}, [created, updated, deleted, errorHandler]);
	
	// DELETE USER
	const deleteTask = (e, id) => {
		e.preventDefault();
		fetch(`/api/users/${id}`, {
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
	// compile dict of Props, so that the correct Props can be supplied to the UserForm
	// {userID: userObj}
    // const objectMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([key, value], i) => [key, fn(value, key, i)]));
    const formPropsDict = {};
	users.forEach((user) => formPropsDict[String(user.id)] = user);

	// generate TaskForm with correct props
	const renderUpdateForm = () => {
		if (showModal.open) {
			return <UserForm {...formPropsDict[showModal.selected]} {...formProps} {...props} />
		}
	}
	const renderCreateForm = () => {
		if (showCreate) {
			return <UserForm {...formProps} create={true} {...props} />
		}
	}
	
	// counter for button ids to correspond with correct task
    var c = 0;
	const columns = [
        {
			Header: "ID",
			accessor: "id",
			width: 100,
			sortable: false,
			resizable: false,
			style:{
				textAlign: "center"
			},
		},
		{
			Header: "Username",
			accessor: "username",
			// width: 250,
			sortable: false,
			style:{
				textAlign: "center"
			},
		},
		{
			Header: "Email",
			accessor: "email",
			// width: 100,
			sortable: false,
			resizable: false,
			style:{
				textAlign: "center"
			},
		},
		{
			Header: "Tasks",
			accessor: "tasks",
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
                    <Button id={users[c%users.length].id} variant='outline-dark' onClick={(e) => {
						// console.log(window.rowIndices);
                        openUpdateModal(e.target.id);
                    }}
                    >Edit</Button>
                    <Button id={users[c++%users.length].id} variant='outline-light' onClick={(e)=> {
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
			>Create User</Button>
			{renderCreateForm()}
			{renderUpdateForm()}
			<ReactTable 
			columns={columns} 
			data={users}
			showPagination={false}
			// getTrProps={getRowIndices}
			// defaultPageSize={100}
			/>
		</>
	);
}

export default Users;