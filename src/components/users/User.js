import React, { useState, useEffect } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Button from 'react-bootstrap/Button';
import { UserForm } from './';

const User = (props) => {
	const {params: {userID}} = props.match;
	const { errorHandler } = props;
    
	const [user, setUser] = useState([{}]);
	const [deleted, setDeleted] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [showModal, setShowModal] = useState(false);
	
	const handleUpdate = () => setUpdated(true);
	const openUpdateModal = () => setShowModal(true);
    const closeUpdateModal = () => setShowModal(false);
		
	const formProps = {
        id: userID,
		username: user[0].username, 
		email: user[0].email, 
		updateHandler: handleUpdate,
        closeUpdateHandler: closeUpdateModal
	}
	
	// GET data from API
	useEffect(() => {
		fetch(`/api/users/${userID}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				errorHandler(data.status);
			} else {
				setUser([data.user]);
				setUpdated(false);
				setDeleted(false);
			}
		});
	}, [userID, updated, deleted, errorHandler]);
	
	// DELETE USER
	const deleteUser = (e) => {
		e.preventDefault();
		fetch(`/api/users/${userID}`, {
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
					<Button variant='outline-dark' onClick={() => {
						openUpdateModal();
					}}
					>Edit</Button>
					<Button variant='outline-light' onClick={(e)=> {
						deleteUser(e);
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

	if (deleted) window.location.pathname = '/users';
			
	return (
		<>
			{showModal && <UserForm {...formProps} {...props} />}
			<ReactTable 
			columns={columns} 
			data={user}
			showPagination={false}
			defaultPageSize={user.length}
			/>
		</>
	);
}

export default User;