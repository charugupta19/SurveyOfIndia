import React from 'react';
import { Line } from 'react-chartjs-2';
import { getChartData, getChartLabels } from './Utils.js';

export default class PortTideChart extends React.Component {

  render() {
    const { selectedDate, selectedPort, monthlyPortTideDetails } = this.props;

    const data = (canvas) => {
      const ctx = canvas.getContext("2d")

      const chartData = getChartData(monthlyPortTideDetails);
      const chartlabels = getChartLabels(monthlyPortTideDetails, selectedDate);

      const gradientStrokePurple = ctx.createLinearGradient(0, 930, 0, 350);
      gradientStrokePurple.addColorStop(1, 'rgba(208,72,182,0.2)');
      gradientStrokePurple.addColorStop(0.2, 'rgba(208,72,182,0.0)');
      gradientStrokePurple.addColorStop(0, 'rgba(208,72,182,0)');

      return {
        labels: chartlabels,
        datasets: [{
          label: "",
          xAxisID: 'xAxis1',
          fill: true,
          backgroundColor: gradientStrokePurple,
          hoverBackgroundColor: gradientStrokePurple,
          borderColor: '#d048b6',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: chartData,
        }]
      }
    };

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title bold">Tide Chart for {selectedPort}</h4>
              <h5 className="card-title bold">Showing low and high tide times for this month. Tide Times are IST (UTC +5.5hrs).</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div className="chartWrapper">
                  <div className="chart-area chartAreaWrapper">
                    <Line
                      data={data}
                      height="35px"
                      options={{
                        responsive: true,
                        legend: {
                          display: false
                        },
                        scales: {
                          xAxes: [
                            {
                              id: 'xAxis1',
                              gridLines: {
                                drawBorder: false,
                                color: 'rgba(29,140,248,0.1)',
                                zeroLineColor: "transparent",
                              },
                              ticks: {
                                padding: 10,
                                fontColor: "#9e9e9e",
                                callback: function (value) {
                                  return value.slice(0, 3);
                                }
                              }
                            },
                            {
                              id: 'xAxis2',
                              gridLines: {
                                drawOnChartArea: false,
                              },
                              ticks: {
                                padding: 20,
                                fontColor: "#9e9e9e",
                                callback: function (value) {
                                  return value.slice(3);
                                }
                              }
                            }
                          ],
                          yAxes: [{
                            gridLines: {
                              drawBorder: false,
                              color: 'rgba(29,140,248,0.1)',
                              zeroLineColor: "transparent",
                            },
                            ticks: {
                              fontColor: "#9e9e9e",
                              padding: 10,
                              stepSize: 0.5,
                              callback: function (value) {
                                return (value) + ' ft';
                              }
                            }
                          }],
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}