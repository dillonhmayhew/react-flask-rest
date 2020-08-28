import React from 'react';
import './err.css';

const MethodNotAllowed = () => {
    return (
        <div id="main">
            <div className="err">
                <h1>Error 405: Method Not Allowed</h1>
            </div>
        </div>
    )
}

export default MethodNotAllowed;