import React from 'react';
import { dayNames, monthNames, getTideType } from './Utils.js';

export default class PortTideTable extends React.Component {

    render() {
        const { portTideDetails, selectedPort, selectedDate } = this.props;

        const DateValue = selectedDate.getDate() + " " + monthNames[selectedDate.getMonth()] + " " + selectedDate.getFullYear();
        const DayValue = dayNames[selectedDate.getDay()];

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card ">
                        <div className="card-header">
                            <h4 className="card-title bold">Today's tide times for {selectedPort}: {DayValue} {DateValue}</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table" id="">
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Tide</th>
                                            <th>Time (IST) & Date</th>
                                            <th>Height</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portTideDetails && portTideDetails.length > 0 ?
                                            portTideDetails.map((value, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td>{getTideType(value)}</td>
                                                        <td>{value.Time}</td>
                                                        <td>{value.Height}</td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <></>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}