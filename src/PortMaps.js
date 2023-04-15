import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class PortMaps extends React.Component {

    selectPortMarker(value) {
        const { getPortDetails, startDate, getPortSelected } = this.props;
        getPortDetails(value.Name, startDate);
        getPortSelected(value);
        window.scrollTo(0, 0);
    }

    render() {
        const { portNames } = this.props;
        const defaultProps = {
            center: [20.5937, 78.9629],
            zoom: 4
        };

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div id="PortMap" className="card ">
                        <div className="card-header">
                            <h4 className="card-title">
                                Select port marked on map with a dot to view the port tide data
                            </h4>
                        </div>
                        <div className="card-body map">

                            <MapContainer
                                style={{ height: "100%", width: "100%" }}
                                center={defaultProps.center}
                                zoom={defaultProps.zoom}
                                scrollWheelZoom={true}>

                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {(portNames && portNames.length > 0) ?
                                    (portNames.map((value, index) => {
                                        if (value.Location) {
                                            return (
                                                <Marker
                                                    key={index}
                                                    position={value.Location}
                                                    eventHandlers={{
                                                        click: (e) => {
                                                            this.selectPortMarker(value)
                                                        },
                                                    }}
                                                />
                                            )
                                        }
                                    }))
                                    :
                                    <></>
                                }
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}