import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const [logout, setLogout] = useState(false);
    const [timer, setTimer] = useState(2)

    useEffect(() => {
        fetch('/api/logout', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 401) {
                setTimeout(() => setLogout(true), 2000);
            }
        })
    }, []);

    useEffect(() => {
        setTimeout(() => setTimer(timer-1), 1000);
    }, [timer]);

    return (
        <>
            {logout ? <Redirect to='/home' /> :
            <div id='display'>
                <div className='text'>
                    <h1>redirecting</h1><br />
                    <h1 className='animate-ellipsis'></h1>
                    <br />
                    <h1 style={{fontSize: '100px'}}>{timer}</h1>
                </div>
            </div>
            }
        </>
    )
}

export default Logout;