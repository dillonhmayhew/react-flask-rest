import React from 'react';

const Error = ({status, message}) => {
    return (
        <div id='display'>
            <div className='text'>
                <h1 className='animate-type'>Error {status}: {message}</h1>
            </div>
        </div>
    )
}

export default Error;