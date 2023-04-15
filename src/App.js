import React from 'react';
import Content from './Content.js';

export default class App extends React.Component {

    render() {
        return (
            <>
                <div className="main-panel">
                <img className="logo" src={process.env.PUBLIC_URL + '/Resources/images/logo.png'} />

                    <div className="top-title">
                        <div className="logoContent">
                            <h2>Survey Of India</h2>
                            <h2>Survey Of India</h2>
                        </div>
                    </div>
                    
                    <div className="content">
                        <Content />
                    </div>
                </div>
            </>
        )
    }
}