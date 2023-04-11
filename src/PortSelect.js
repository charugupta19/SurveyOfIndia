import React from 'react';
import { forwardRef } from "react";
import DatePicker from 'react-datepicker';
import Message from './Message.js';

import "react-datepicker/dist/react-datepicker.css";

export default class PortSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            placeHolderValue: "Select",
            portSelected: "",
            startDate: new Date()
        }
    }

    getPortSelected = (port) => {
        this.setState({
            placeHolderValue: port.Name,
            portSelected: port.Name
        });
    }

    setStartDate = (date) => {
        this.setState({
            startDate: date
        });
    }

    render() {
        const { portNames, getPortDetails } = this.props;
        const { placeHolderValue, portSelected, startDate } = this.state;


        const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
            <input
                value={value}
                className="custom-input form-control"
                onClick={onClick}
                onChange={onChange}
                ref={ref}
            />
        ));

        return (
            (portNames && portNames.length > 0) ?
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4 className="card-title">Select the Desired Port</h4>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="dropdown bootstrap-select full-width">
                                                    <button type="button" className="btn dropdown-toggle select-with-transition bs-placeholder" data-toggle="dropdown" role="button" title={placeHolderValue} aria-expanded="false">
                                                        <div className="filter-option">
                                                            <div className="filter-option-inner">
                                                                <div className="filter-option-inner-inner">{placeHolderValue}</div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                    <div className="dropdown-menu" style={{ "maxHeight": "300px", "overflowY": "auto" }}>
                                                        <div className="inner show">
                                                            <ul className="dropdown-menu inner show">
                                                                <li className="disabled">
                                                                    <a role="option" className="dropdown-item disabled" tabIndex="-1">
                                                                        <span className="text">Choose the Port</span>
                                                                    </a>
                                                                </li>
                                                                {portNames.map((value, index) => {
                                                                    return (
                                                                        <li key={index} onClick={() => this.getPortSelected(value)}>
                                                                            <a role="option" className="dropdown-item" tabIndex="0">
                                                                                <span>
                                                                                    {value.Name}
                                                                                </span>
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <DatePicker
                                                    showIcon
                                                    selected={startDate}
                                                    onChange={(date) => this.setStartDate(date)}
                                                    customInput={<ExampleCustomInput />}
                                                    popperClassName="datepicker-class"
                                                    todayButton="TODAY"
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <button className="btn btn-primary animation-on-hover full-width" onClick={() => getPortDetails(portSelected, startDate)}>
                                                    <i className="tim-icons icon-sound-wave"></i> Get Port Data
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                (portNames && portNames.error) ?
                    <Message msg={portNames.error.message} />
                    :
                    <></>
        )
    }
}