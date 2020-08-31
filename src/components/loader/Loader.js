import React from 'react';
// scss
import './style.scss';

const Loader = () => {
    return (
        <div className="loader__container d-flex justify-content-center align-items-center">
            <p>🚀 It's Loading </p>
            <div className="loader__dots--animation" id="loader-2">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loader;
