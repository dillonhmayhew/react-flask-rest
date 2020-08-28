import React from 'react';
import './err.css';

const Unauthorized = () => {
    return (
        <div id="main">
            <div className="err">
                <h1>Error 401: Unauthorized Access</h1>
            </div>
        </div>
    )
}

export default Unauthorized;