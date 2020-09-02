import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';

const Token = () => {
    const [token, setToken] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/token', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.status);
            } else {
                setToken(data.token);
            }
        })
    }, []);

    const autoLogout = () => {
        fetch('/api/logout', {
            method: 'GET'
        });
    }

    return (
        <>  
            {token && autoLogout()}
            {error ? <Redirect to={`/${error}`} /> :
            <div id='display'>
                <div className='text'>
                    <h1>Copy your token:</h1>
                    <br />
                    <code>{token}</code>
                    <br />
                    {token ?
                    <>
                        <h1>Use as username for token-based authentication.</h1>
                        <h1 style={{fontSize: '25px'}}>This token will expire in 10 minutes.</h1>
                    </>  : <br />
                    }
                </div>
            </div>
            }
        </>
    )
}

export default Token;