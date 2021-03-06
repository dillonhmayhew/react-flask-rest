import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const TaskForm = (props) => {
	// Modal
	const [show, setShow] = useState(true);

	// Form
    const [title, setTitle] = useState(props.title);
    const [done, setDone] = useState(props.done);
    const [description, setDescription] = useState(props.description);
	
	// Modal
	const handleClose = () => {
		setShow(false);
		props.create ? props.closeCreateHandler() : props.closeUpdateHandler();
	}

	// Form
	const handleSubmit = (e) => {
		e.preventDefault();
        fetch(`/api/tasks/${props.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                done: getDone(),
                description: description
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

	// CREATE TASK
	const createTask = (e) => {
		e.preventDefault();
        fetch(`/api/tasks`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                done: getDone(),
                description: description
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

    const getDone = () => {
        return done === undefined ? (props.done === 'true' ? true : false) : (done === 'true' ? true : false);
    }
	
	return (
		<>
		<Modal show={show} onHide={handleClose} size='lg' aria-labelledby="task-modal-vcenter" centered>
			<Modal.Header closeButton>
			<Modal.Title>{props.create ? 'Create Task' : 'Update Task '}<b>{props.id}</b></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form id='TaskForm'>
					<Form.Row>
						<Col xs={4}>
						<Form.Group as={Col} controlId='titleInput'>
							<Form.Label>Title </Form.Label>
							<Form.Control 
								type='text'
								name='title' 
								autoComplete='off'
								defaultValue={props.title}
								onChange={e => setTitle(e.target.value)}
							/>
						</Form.Group>
						</Col>
						<Col>
						<Form.Group as={Col} controlId='textAreaInput'>
							<Form.Label>Description </Form.Label>
							<Form.Control as='textarea'
								name='description'
								rows='3'
								defaultValue={props.description}
								onChange={e => setDescription(e.target.value)}
							/>
						</Form.Group>
						</Col>
					</Form.Row>
					<Form.Row>
					<Col xs={3}>
						<Form.Group as={Col} controlId='doneSelect'>
							<Form.Label>Done </Form.Label>
							<Form.Control as='select' name='done' defaultValue='---' onChange={e => setDone(e.target.value)}>
								<option>---</option>
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</Form.Control>
						</Form.Group>
						</Col>
					</Form.Row>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
				Close
				</Button>
				<Button variant="primary" onClick={props.create ? createTask : handleSubmit}>
				{props.create ? 'Create' : 'Save Changes'}
				</Button>
			</Modal.Footer>
		</Modal>
		</>
	);
}

export default TaskForm;