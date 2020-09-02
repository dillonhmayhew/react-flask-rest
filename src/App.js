import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Task, Tasks } from './components/tasks'
import { User, Users } from './components/users'
import { Header, Logout, Token } from './components';
// import { BadRequest, Unauthorized, NotFound, MethodNotAllowed } from './components/errors';
import { Error } from './components/errors';
import './App.css';


const App = () => {
	const [errorStatus, setErrorStatus] = useState(0);

	const childErrorStatus = (err) => setErrorStatus(err)

	const mainProps = {
		errorHandler: childErrorStatus
	}

	if (errorStatus) window.location.pathname = `/${errorStatus}`;

	return (
		<>
			<Switch>
				<Route path="/logout" component={Logout} />
				<>
					<Header />
					<Route path="/tasks/:taskID" render={(props) => <Task {...props} {...mainProps} />} />
					<Route exact path="/tasks" render={(props) => <Tasks {...props} {...mainProps} />} />
					<Route path="/users/:userID" render={(props) => <User {...props} {...mainProps} />} />
					<Route exact path="/users" render={(props) => <Users {...props} {...mainProps} />} />
					<Route path="/400" render={() => <Error status={400} message='Bad Request' />} />
					<Route path="/401" render={() => <Error status={401} message='Unauthorized Access' />} />
					<Route path="/404" render={() => <Error status={404} message='Not Found' />} />
					<Route path="/405" render={() => <Error status={405} message='Method Not Allowed' />} />
					<Route path="/token" component={Token} />
					<Route path="/" />
				</>
			</Switch>
		</>
	);
}

export default App;
