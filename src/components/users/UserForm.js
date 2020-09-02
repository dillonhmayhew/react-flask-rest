import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const UserForm = (props) => {
	// Modal
	const [show, setShow] = useState(true);

	// Form
    const [username, setUsername] = useState(props.username);
    const [email, setEmail] = useState(props.email);
    const [passwd, setPasswd] = useState('');
	
	// Modal
	const handleClose = () => {
		setShow(false);
		props.create ? props.closeCreateHandler() : props.closeUpdateHandler();
	}

	// Form
	const handleSubmit = (e) => {
		e.preventDefault();
        fetch(`/api/users/${props.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                passwd: passwd
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                props.errorHandler(data.status);
            } else {
                props.updateHandler();
            }
		});
		handleClose();
	};

	// CREATE USER
	const createUser = (e) => {
		e.preventDefault();
        fetch(`/api/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                passwd: passwd
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                props.errorHandler(data.status);
            } else {
                props.createHandler();
            }
		});
		handleClose();
    };
	
	return (
		<>
		<Modal show={show} onHide={handleClose} size='lg' aria-labelledby="user-modal-vcenter" centered>
			<Modal.Header closeButton>
			<Modal.Title>{props.create ? 'Create User' : 'Update User '}<b>{props.username}</b></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form id='UserForm'>
                    <Form.Group as={Col} controlId='usernameInput'>
                        <Form.Label>Username </Form.Label>
                        <Form.Control 
                            type='text'
                            name='username' 
                            autoComplete='off'
                            defaultValue={props.username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId='emailInput'>
                        <Form.Label>Email </Form.Label>
                        <Form.Control 
                            type='email'
                            name='email'
                            defaultValue={props.email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId='password'>
                        <Form.Label>Password </Form.Label>
                        <Form.Control 
                            type='password' 
                            name='passwd' 
                            onChange={e => setPasswd(e.target.value)}
                        />
                        {props.create ? '' : <Form.Text className="text-muted">
                            Leave field blank to preserve current password.
                        </Form.Text>}
                    </Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
				Close
				</Button>
				<Button variant="primary" onClick={props.create ? createUser : handleSubmit}>
				{props.create ? 'Create' : 'Save Changes'}
				</Button>
			</Modal.Footer>
		</Modal>
		</>
    );
}

export default UserForm;