import React from 'react';

export default class MapMarker extends React.Component {

    render() {

        const { text } = this.props;

        return (
            <div className='mapMarker'>
                {text}
            </div>
        )
    }
}