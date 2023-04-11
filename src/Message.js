import React from 'react';

export default class Message extends React.Component {
    render() {
        const { msg } = this.props;

        return (
            <div className="row">
                <div className="col-12">
                    <div className="alert alert-primary">
                        <button type="button" aria-hidden="true" className="close" data-dismiss="alert" aria-label="Close">
                            <i className="tim-icons icon-simple-remove"></i>
                        </button>
                        <span>{msg}</span>
                    </div>
                </div>
            </div>
        )
    }
}