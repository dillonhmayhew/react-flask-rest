import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Task, Tasks } from './components/tasks'
import { User, Users } from './components/users'
import { Header, Logout } from './components';
// import { BadRequest, Unauthorized, NotFound, MethodNotAllowed } from './components/errors';
import { Error } from './components/errors';
import './App.css';


const App = () => {
	return (
		<>
			<Switch>
				<Route path="/400" render={() => <Error status={400} message='Bad Request' />} />
				<Route path="/401" render={() => <Error status={401} message='Unauthorized Access' />} />
				<Route path="/404" render={() => <Error status={404} message='Not Found' />} />
				<Route path="/405" render={() => <Error status={405} message='Method Not Allowed' />} />
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
