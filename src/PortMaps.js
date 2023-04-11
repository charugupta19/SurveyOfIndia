import React from 'react';
// import GoogleMapReact from 'google-map-react';
// import MapMarker from './MapMarker.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class PortMaps extends React.Component {

    render() {

        const defaultProps = {
            center: [20.5937, 78.9629],
            zoom: 4
        };

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card ">
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

                                <Marker
                                    position={defaultProps.center}
                                    eventHandlers={{
                                        click: (e) => {
                                            alert('marker clicked', e)
                                        },
                                    }}
                                />
                                {/* <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker> */}
                            </MapContainer>

                            {/* <GoogleMapReact
                                bootstrapURLKeys={{ key: "" }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                options={{
                                    gestureHandling: "greedy",
                                }}
                            >
                                <MapMarker  lat={20.5937} lng={78.9629} text={'A'} />
                            </GoogleMapReact> */}

                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d112018.87206657144!2d77.316096!3d28.672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1678900136602!5m2!1sen!2sin" height="450" style={{ "border": "0", "width": "100%" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                            {/* <iframe id="GoogleMaps" src="https://www.google.com/maps/d/embed?mid=1NRAduOqZBfJrfb45XpEBkDQ6MaVoTn8&ehbc=2E312F" height="480" style={{ "border": "0", "width": "100%" }}></iframe> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}