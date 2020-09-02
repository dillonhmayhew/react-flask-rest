import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Task, Tasks } from './components/tasks'
import { User, Users } from './components/users'
import { Header, Logout } from './components';
import { BadRequest, Unauthorized, NotFound, MethodNotAllowed } from './components/errors';
import './App.css';


const App = () => {
	return (
		<>
			<Switch>
				<Route path="/400" component={BadRequest} />
				<Route path="/401" component={Unauthorized} />
				<Route path="/404" component={NotFound} />
				<Route path="/405" component={MethodNotAllowed} />
				<Route path="/logout" component={Logout} />
				<>
					<Header />
					<Route path="/tasks/:taskID" render={(props) => <Task {...props} />} />
					<Route exact path="/tasks" render={(props) => <Tasks {...props} />} />
					<Route path="/users/:userID" render={(props) => <User {...props} />} />
					<Route exact path="/users" render={(props) => <Users {...props} />} />
					<Route path="/" />
				</>
			</Switch>
		</>
	);
}

export default App;
