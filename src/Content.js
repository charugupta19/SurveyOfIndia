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
            selectedDate: {},
            portSelected: "Mumbai",
            startDate: new Date()
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get(`Responses/ports.json`)
            .then(res => {
                this.setState({
                    loading: false,
                    portNames: res.data,
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    portNames: { error: err }
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

            // axios.post(`Responses/portTideDetails.json`, { "Port": port, "Date": DateValue }, { headers: { "Content-Type": "text/plain" } })
            axios.get(`Responses/portTideDetails.json`)
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
                        portTideDetails: { error: err }
                    })
                })
        }
    }

    getMonthlyPortDetails = (port, month, year) => {
        // axios.get(`Responses/monthlyPortTideDetails.json/${port}/${month}/${year}`)
        axios.get(`Responses/monthlyPortTideDetails.json`)
            .then(res => {

                this.setState({
                    loading: false,
                    monthlyPortTideDetails: res.data,
                })

            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    monthlyPortTideDetails: { error: err }
                })
            })
    }

    getPortSelected = (port) => {
        this.setState({
            portSelected: port.Name
        });
    }

    setStartDate = (date) => {
        this.setState({
            startDate: date
        });
    }

    render() {

        const { loading, portNames, showPortDetails, selectedPort, selectedDate, portTideDetails, noDataFound, monthlyPortTideDetails, noPortSelected, portSelected, startDate } = this.state;

        const noDataFoundMessage = "No Tide Data associated with the Port found.";
        const noPortSelectedMessage = "Please select port to view data";

        return (
            <>
                {loading && <Loader />}

                <PortSelect portNames={portNames} getPortDetails={this.getPortDetails} getPortSelected={this.getPortSelected} setStartDate={this.setStartDate} portSelected={portSelected} startDate={startDate} />

                {
                    showPortDetails ?
                        <>
                            <PortTideDetails portTideDetails={portTideDetails} selectedPort={selectedPort} selectedDate={selectedDate} />
                            <PortTideTable portTideDetails={portTideDetails} selectedPort={selectedPort} selectedDate={selectedDate} />
                            <PortTideChart selectedDate={selectedDate} selectedPort={selectedPort} monthlyPortTideDetails={monthlyPortTideDetails} />
                            <PortMaps portNames={portNames} getPortDetails={this.getPortDetails} startDate={startDate} getPortSelected={this.getPortSelected} />
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