import React from 'react';
import { forwardRef } from "react";
import DatePicker from 'react-datepicker';
import Message from './Message.js';

import "react-datepicker/dist/react-datepicker.css";

export default class PortSelect extends React.Component {

    componentDidMount() {
        const { portSelected, startDate } = this.props;
        this.props.getPortDetails(portSelected, startDate);
    }

    scrollToMap() {
        window.location.href = "#PortMap";
    };

    render() {
        const { portNames, getPortDetails, portSelected, startDate, setStartDate, getPortSelected } = this.props;


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
                                                    <button type="button" className="btn dropdown-toggle select-with-transition bs-placeholder zIndex-5" data-toggle="dropdown" title={portSelected} aria-expanded="false">
                                                        <div className="filter-option">
                                                            <div className="filter-option-inner">
                                                                <div className="filter-option-inner-inner">{portSelected}</div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                    <div className="dropdown-menu" style={{ "maxHeight": "300px", "overflowY": "auto" }}>
                                                        <div className="inner show">
                                                            <ul className="dropdown-menu inner show">
                                                                <li className="disabled">
                                                                    <a role="option" aria-selected="true" className="dropdown-item disabled" tabIndex="-1">
                                                                        <span className="text">Choose the Port</span>
                                                                    </a>
                                                                </li>
                                                                {portNames.map((value, index) => {
                                                                    return (
                                                                        <li key={index} onClick={() => getPortSelected(value)}>
                                                                            <a role="option" aria-selected="true" className="dropdown-item" tabIndex="0">
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
                                                    onChange={(date) => setStartDate(date)}
                                                    customInput={<ExampleCustomInput />}
                                                    popperClassName="datepicker-class"
                                                    todayButton="TODAY"
                                                    popperModifiers={[
                                                        {
                                                            name: 'arrow',
                                                            options: { padding: 24 },
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <button className="btn btn-primary animation-on-hover full-width zIndex-5" onClick={() => getPortDetails(portSelected, startDate)}>
                                                    Get Selected Port Data
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <br />
                                                <p>Port can also be selected from the Map below.</p>
                                                <button className="btn btn-primary animation-on-hover full-width zIndex-5" onClick={() => this.scrollToMap()} type="button">
                                                    Select Port on Map
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