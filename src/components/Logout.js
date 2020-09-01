import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const [logout, setLogout] = useState(false);
    const [timer, setTimer] = useState(3)

    useEffect(() => {
        fetch('/api/logout', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 401) {
                setTimeout(() => setLogout(true), 3000);
            }
        })
    }, []);

    useEffect(() => {
        setTimeout(() => setTimer(timer-1), 1000);
    }, [timer]);

    return (
        <>
            {logout ? <Redirect to='/home' /> :
            <div id="main">
                <div className="err">
                    <h1>You Have Successfully Logged Out</h1>
                    <br />
                    <br />
                    <br />
                    <h1>You will be redirected in</h1>
                    <br />
                    <h1>{timer}</h1>
                </div>
            </div>
            }
        </>
    )
}

export default Logout;