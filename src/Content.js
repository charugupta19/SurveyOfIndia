import React from 'react';
import axios from 'axios';
import PortSelect from './PortSelect.js';
import PortTideChart from './PortTideChart.js';
import PortTideDetails from './PortTideDetails.js';
import PortTideTable from './PortTideTable.js';
import PortMaps from './PortMaps.js';
import Loader from './Loader.js';
import Message from './Message.js';
import { monthNames } from './Utils.js';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            portNames: [],
            showPortDetails: false,
            portTideDetails: [],
            monthlyPortTideDetails: [],
            noDataFound: false,
            noPortSelected: false,
            selectedPort: "",
            selectedDate: {}

        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get(`test/getPorts`)
            .then(res => {
                this.setState({
                    loading: false,
                    portNames: res.data,
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    // portNames: { error: err }
                    portNames: [
                        { Name: "Aden" },
                        { Name: "Akyab" },
                        { Name: "Amherst" },
                        { Name: "Bassein" },
                        { Name: "Beypore" },
                        { Name: "Bhavnagar" },
                        { Name: "Bremen" },
                        { Name: "Bremerhaven" },
                        { Name: "Bushire" },
                        { Name: "Cape Town" },
                        { Name: "Chandbali" },
                        { Name: "Chemulpho" },
                        { Name: "Chennai" },
                        { Name: "Cochin" },
                        { Name: "Colombo" },
                        { Name: "Cuxhaven" },
                        { Name: "Dar-Es-Salam" }
                    ]
                })
            })
    }

    getPortDetails = (port, date) => {
        if (port === "") {

            this.setState({
                showPortDetails: false,
                noPortSelected: true,
            });

        } else {

            this.setState({
                loading: true,
                selectedPort: port,
                selectedDate: date
            });

            const DateValue = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
            this.getMonthlyPortDetails(port, monthNames[date.getMonth()], date.getFullYear());

            axios.post(`test/portTideDetails`, { "Port": port, "Date": DateValue }, { headers: { "Content-Type": "text/plain" } })
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        this.setState({
                            portTideDetails: res.data,
                            showPortDetails: true
                        })
                    } else {
                        this.setState({
                            showPortDetails: false,
                            noDataFound: true
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        showPortDetails: true, //remove
                        // portTideDetails: { error: err }
                        portTideDetails: [
                            {
                                "Time": "03:10",
                                "Height": "4.0 m"
                            },
                            {
                                "Time": "11:51",
                                "Height": "0.5 m"
                            },
                            {
                                "Time": "20:23",
                                "Height": "4.9 m"
                            },
                            {
                                "Time": "23:59",
                                "Height": "1.8 m"
                            }
                        ]
                    })
                })
        }
    }

    getMonthlyPortDetails = (port, month, year) => {
        axios.get(`$test/monthlyPortTideDetails/${port}/${month}/${year}`)
            .then(res => {

                this.setState({
                    loading: false,
                    monthlyPortTideDetails: res.data,
                })

            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    monthlyPortTideDetails: [
                        [
                            {
                                "Time": "03:10 AM",
                                "Height": "2.0 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "0.5 m"
                            },
                            {
                                "Time": "20:23 PM",
                                "Height": "4.9 m"
                            },
                            {
                                "Time": "23:30 PM",
                                "Height": "1.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "03:10 AM",
                                "Height": "2.0 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "0.5 m"
                            },
                            {
                                "Time": "20:23 PM",
                                "Height": "4.9 m"
                            },
                            {
                                "Time": "23:30 PM",
                                "Height": "1.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "04:12 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "12:25 PM",
                                "Height": "4.4 m"
                            },
                            {
                                "Time": "20:19 PM",
                                "Height": "1.9 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "03:10 AM",
                                "Height": "2.0 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "0.5 m"
                            },
                            {
                                "Time": "20:23 PM",
                                "Height": "4.9 m"
                            },
                            {
                                "Time": "23:30 PM",
                                "Height": "1.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "03:10 AM",
                                "Height": "2.0 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "0.5 m"
                            },
                            {
                                "Time": "20:23 PM",
                                "Height": "4.9 m"
                            },
                            {
                                "Time": "23:30 PM",
                                "Height": "1.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "04:12 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "12:25 PM",
                                "Height": "4.4 m"
                            },
                            {
                                "Time": "20:19 PM",
                                "Height": "1.9 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "03:10 AM",
                                "Height": "2.0 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "0.5 m"
                            },
                            {
                                "Time": "20:23 PM",
                                "Height": "4.9 m"
                            },
                            {
                                "Time": "23:30 PM",
                                "Height": "1.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "03:10 AM",
                                "Height": "2.0 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "0.5 m"
                            },
                            {
                                "Time": "20:23 PM",
                                "Height": "4.9 m"
                            },
                            {
                                "Time": "23:30 PM",
                                "Height": "1.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "05:10 AM",
                                "Height": "3.0 m"
                            },
                            {
                                "Time": "10:51 AM",
                                "Height": "1.5 m"
                            },
                            {
                                "Time": "21:23 PM",
                                "Height": "3.9 m"
                            },
                            {
                                "Time": "23:00 PM",
                                "Height": "2.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "04:12 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "12:25 PM",
                                "Height": "4.4 m"
                            },
                            {
                                "Time": "20:19 PM",
                                "Height": "1.9 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ],
                        [
                            {
                                "Time": "06:10 AM",
                                "Height": "1.9 m"
                            },
                            {
                                "Time": "11:51 AM",
                                "Height": "2.5 m"
                            },
                            {
                                "Time": "18:13 PM",
                                "Height": "5.9 m"
                            },
                            {
                                "Time": "20:47 PM",
                                "Height": "3.8 m"
                            }
                        ]
                    ]
                })
            })
    }

    render() {

        const { loading, portNames, showPortDetails, selectedPort, selectedDate, portTideDetails, noDataFound, monthlyPortTideDetails, noPortSelected } = this.state;

        const noDataFoundMessage = "No Tide Data associated with the Port found.";
        const noPortSelectedMessage = "Please select port to view data";

        return (
            <>
                {loading && <Loader />}

                <PortSelect portNames={portNames} getPortDetails={this.getPortDetails} />

                {
                    showPortDetails ?
                        <>
                            <PortTideDetails portTideDetails={portTideDetails} selectedPort={selectedPort} selectedDate={selectedDate} />
                            <PortTideTable portTideDetails={portTideDetails} selectedPort={selectedPort} selectedDate={selectedDate} />
                            <PortTideChart selectedDate={selectedDate} selectedPort={selectedPort} monthlyPortTideDetails={monthlyPortTideDetails} />
                            <PortMaps />
                        </>
                        :
                        noDataFound ?
                            <Message msg={noDataFoundMessage} />
                            :
                            noPortSelected ?
                                <Message msg={noPortSelectedMessage} />
                                :
                                <></>
                }
            </>
        )
    }
}