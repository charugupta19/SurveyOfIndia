import React from 'react';
import { dayNames, monthNames, getRemainingTime, getNearestTime } from './Utils.js';

export default class PortTideDetails extends React.Component {

    render() {
        const { portTideDetails, selectedPort, selectedDate } = this.props;

        var highTideTime = [], lowTideTime = [], remainingTimeArr = [];
        var currentLocalTime = new Date().toLocaleTimeString("en-GB"),
            nextHighTideMsg = "No Next High Tide Today",
            nextLowTideMsg = "No Next Low Tide Today",
            tideTypeClass = "";

        for (var i = 0; i < portTideDetails.length; i++) {
            const height = parseInt(portTideDetails[i].Height.slice(0, 1));

            if (height >= 4) {
                highTideTime.push(portTideDetails[i].Time);
            } else if (height < 4) {
                lowTideTime.push(portTideDetails[i].Time);
            }
        }

        for (var i = 0; i < portTideDetails.length; i++) {
            const height = parseInt(portTideDetails[i].Height.slice(0, 1));

            if (portTideDetails[i].Time + ":00" > currentLocalTime) {
                if (height >= 4) {
                    nextHighTideMsg = "Next High Tide in " + selectedPort + " is at " + portTideDetails[i].Time + " which is in " + getRemainingTime(portTideDetails[i].Time + ":00", currentLocalTime);

                    remainingTimeArr.push({
                        remainingTime: getRemainingTime(portTideDetails[i].Time + ":00", currentLocalTime),
                        portDetail: portTideDetails[i],
                        index: i
                    })

                    break;
                }
            }
        }

        for (var i = 0; i < portTideDetails.length; i++) {
            const height = parseInt(portTideDetails[i].Height.slice(0, 1));

            if (portTideDetails[i].Time + ":00" > currentLocalTime) {
                if (height < 4) {
                    nextLowTideMsg = "Next Low Tide in " + selectedPort + " is at " + portTideDetails[i].Time + " which is in " + getRemainingTime(portTideDetails[i].Time + ":00", currentLocalTime);

                    remainingTimeArr.push({
                        remainingTime: getRemainingTime(portTideDetails[i].Time + ":00", currentLocalTime),
                        portDetail: portTideDetails[i],
                        index: i
                    })

                    break;
                }
            }
        }

        const DateValue = selectedDate.getDate() + " " + monthNames[selectedDate.getMonth()] + " " + selectedDate.getFullYear();
        const DayValue = dayNames[selectedDate.getDay()];
        const nearestTimeObj = getNearestTime(remainingTimeArr);

        return (
            (portTideDetails && portTideDetails.length > 0) ?
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card ">
                            <div className="card-header">
                                <h4 className="card-title">
                                    Today's tide times for {selectedPort}
                                </h4>
                            </div>
                            <div className="card-body">
                                The predicted tide times today on {DayValue} {DateValue} for {selectedPort} are: First high tide is at {highTideTime[0]}, first low tide at {lowTideTime[0]}.
                                Second high tide is at {highTideTime[1]}, second low tide at {lowTideTime[1]}.

                                <div className="waveWrapper waveAnimation">
                                    <div className="waveWrapperInner bgTop">
                                        <div className="wave waveTop"></div>

                                        <div className="img-text-block-1">
                                            <i className={tideTypeClass}></i>
                                            <h5></h5>
                                        </div>

                                        <div className="img-text-block-2">
                                            <h5>{nextHighTideMsg}</h5>
                                        </div>

                                        <div className="img-text-block-3">
                                            <h5>{nextLowTideMsg}</h5>
                                        </div>

                                        <div className="img-text-block-4">
                                            <h5>Local Time: {currentLocalTime}</h5>
                                        </div>

                                    </div>
                                    <div className="waveWrapperInner bgMiddle">
                                        <div className="wave waveMiddle"></div>
                                    </div>
                                    <div className="waveWrapperInner bgBottom">
                                        <div className="wave waveBottom"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
        )
    }
}