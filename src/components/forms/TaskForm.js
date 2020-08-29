import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    Form,
    Button 
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
        fetch(`/api/tasks/${this.props.taskID}`, {
            method: this.props.method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.title,
                done: !(['false', '0'].indexOf(String(this.state.done).toLowerCase().trim()) + 1),
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
    render() {

        if (this.state.errorStatus) return <Redirect to={`/${this.state.errorStatus}`} />;
        if (this.state.success) return <Redirect to={`/tasks/${this.props.taskID}`} />;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Label>Title: </Form.Label>
                <input 
                    type='text'
                    name='title' 
                    // ref={this.titleInput}
                    defaultValue={this.props.title}
                    onChange={this.handleChange}
                />
                <Form.Label>Done: </Form.Label>
                <select name='done' value={this.props.done} onChange={this.handleChange}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <Form.Label>Description: </Form.Label>
                <textarea
                    type='text' 
                    name='description'
                    // ref={this.descrInput}
                    defaultValue={this.props.description}
                    onChange={this.handleChange}
                />
                <Button variant='primary' type='submit'>{this.props.bText}</Button>
            </Form>
        )
    }
}

export default TaskForm;