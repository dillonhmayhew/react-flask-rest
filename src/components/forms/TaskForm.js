import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    Form,
    Button,
    Col
} from 'react-bootstrap';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            done: this.props.done,
            description: this.props.description,
            errorStatus: null,
            success: false
        }
        // this.titleInput = React.createRef();
        // this.doneInput = React.createRef();
        // this.descrInput = React.createRef();
    }
    handleChange = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val })
    };
    handleSubmit = (e) => {
        // e.preventDefault();
        fetch(`/api/tasks/${this.props.taskID}`, {
            method: this.props.method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                done: this.getDone(),
                description: this.state.description
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                this.setState({errorStatus: data.status});
            } else {
                this.setState({success: true});
            }
        });
    };
    getDone = () => {
        return this.state.done === undefined ? (this.props.done === 'true' ? true : false) : (this.state.done === 'true' ? true : false);
    }

    render() {
        // if (this.state.errorStatus) return <Redirect to={`/${this.state.errorStatus}`} />;
        // if (this.state.success) return <Redirect to={`/tasks/${this.props.taskID}`} />;

        return (
            <Form onSubmit={this.handleSubmit} id='TaskForm'>
                <Form.Row>
                    <Col xs={3}>
                    <Form.Group as={Col} controlId='titleInput'>
                        <Form.Label>Title </Form.Label>
                        <Form.Control 
                            type='text'
                            name='title' 
                            autoComplete='off'
                            defaultValue={this.props.title}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    </Col>
                    <Col xs={1}>
                    <Form.Group as={Col} controlId='doneSelect'>
                        <Form.Label>Done </Form.Label>
                        <Form.Control as='select' name='done' defaultValue={'---'} onChange={this.handleChange}>
                            <option>---</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group as={Col} controlId='textAreaInput'>
                        <Form.Label>Description </Form.Label>
                        <Form.Control as='textarea'
                            name='description'
                            rows='3'
                            defaultValue={this.props.description}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    </Col>
                </Form.Row>
                <Button variant='primary' type='submit'>{this.props.bText}</Button>
            </Form>
        )
    }
}

export default TaskForm;