import React from 'react';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        alert('You have submitted the form!');
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input 
                        type="text" 
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
            </form>
        )
    }
}

export default TaskForm;