import React from 'react';

const Loading = () => {
    return (
        <div className="loading">
            <div className="atom-spinner">
                <div className="spinner-inner">
                    <div className="spinner-line"/>
                    <div className="spinner-line"/>
                    <div className="spinner-line"/>
                    {/*Chrome renders little circles malformed :(*/}
                    <div className="spinner-circle">●</div>
                </div>
            </div>

        </div>
    );
};

export default Loading;