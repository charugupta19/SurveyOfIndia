export const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday"
]

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export function getTideType(item) {
    const height = parseInt(item.Height.slice(0, 1));
    var tide = "Tide";

    if (height >= 4) {
        tide = "High Tide";
    } else if (height < 4) {
        tide = "Low Tide";
    }

    return tide
}

export function getChartData(monthlyPortTideDetails) {
    var data = [];
    var wrapper = monthlyPortTideDetails && monthlyPortTideDetails.length > 0 ?
        monthlyPortTideDetails.map((value) =>
            value.map((item) =>
                data.push(item.Height.split(" ")[0])
            ))
        :
        []
    return data
}

export function getChartLabels(monthlyPortTideDetails, selectedDate) {
    var labels = [], tideType, date;
    var month = monthNames[selectedDate.getMonth()].slice(0, 3);

    var func = monthlyPortTideDetails && monthlyPortTideDetails.length > 0 ?
        monthlyPortTideDetails.map((value, index) => {
            date = (index + 1) + " " + month;
            value.map((item) => {
                tideType = getTideType(item);
                labels.push([item.Time, item.Height, tideType, date])
                return null
            })
            return null
        })
        :
        []
    return labels
}

export function getRemainingTime(futureTime, nowTime) {
    const furtureTimeValue = new Date("1970-01-01T" + futureTime).getTime();
    const nowTimeValue = new Date("1970-01-01T" + nowTime).getTime();

    const timeleft = furtureTimeValue - nowTimeValue;
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

    return hours + ' hours ' + minutes + ' minutes.'
}

export function getNearestTideObj(portTideDetails, highLowTide) {
    const currentTime = new Date().getHours();
    const portTideTimes = [];

    highLowTide && highLowTide.map((value) => portTideTimes.push(value.split(":")[0]))

    var sortedTideTime = portTideTimes.sort(function (a, b) {
        var diffA = Math.abs(a - currentTime),
            diffB = Math.abs(b - currentTime);
        if (diffA < diffB) {
            return -1;
        } else if (diffA > diffB) {
            return 1;
        } else {
            return 0;
        }
    });

    var nearestTideTime = sortedTideTime[0];

    for (let i = 0; i < portTideDetails.length; i++) {
        if (nearestTideTime === portTideDetails[i].Time.split(":")[0]) {
            const height = parseInt(portTideDetails[i].Height.slice(0, 1));
            if (height >= 4) {
                return {
                    class: "icon-minimal-up",
                    tide: "high"
                }
            } else if (height < 4) {
                return {
                    class: "icon-minimal-down",
                    tide: "low"
                }
            }
        }
    }
}