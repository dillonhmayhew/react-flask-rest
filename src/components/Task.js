import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Redirect } from 'react-router-dom';
import { TaskForm } from './forms'


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: [{}],
            taskID: props.match.params.taskID,
            errorStatus: null
        }
    }

    componentDidMount() {
        fetch(`/api/tasks/${this.state.taskID}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                this.setState({errorStatus: data.status});
            } else {
                data.task.done = String(data.task.done);
                this.setState({task: [data.task]});
            }
        });
    }
    render() {
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
                style:{
                    textAlign: "center"
                },
            }
        ]

        if (this.state.errorStatus) return <Redirect to={`/${this.state.errorStatus}`} />;
    
        return (
            <>
                <TaskForm 
                    taskID={this.state.taskID}
                    title={this.state.task[0].title} 
                    done={this.state.task[0].done} 
                    description={this.state.task[0].description} 
                    bText='Update'
                    method='PUT'
                />
                <ReactTable 
                    columns={columns} 
                    data={this.state.task}
                    showPagination={false}
                    defaultPageSize={this.state.task.length}
                />
            </>
        );
    }
}

export default Task;