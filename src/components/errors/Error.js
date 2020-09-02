import React from 'react';
import './err.css';

const Error = ({status, message}) => {
    return (
        <div id="display">
            <div className="message">
                <h1>Error {status}: {message}</h1>
            </div>
        </div>
    )
}

export default Error;