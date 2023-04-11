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

// export function getalldates(yearValue, monthValue, dateValue) {
//     let date = new Date(yearValue, monthValue, dateValue);
//     let dates = [];
//     let i = 0;
//     while (i <= 7) {
//         dates.push(new Date(date));
//         date.setDate(date.getDate() + 1);
//         i++;
//     }
//     return dates;
// }

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

export function getNearestTime(remainingTimeArr) {
    var hourArr = [], minuteArr = [], minData = [];
    remainingTimeArr && remainingTimeArr.map((value) => {
        const hour = parseInt(value.remainingTime.split(" ")[0]);
        const minute = parseInt(value.remainingTime.split(" ")[2]);

        hourArr.push({
            hour: hour,
            portDetail: value.portDetail,
            index: value.portDetail
        });
        minuteArr.push({
            minute: minute,
            portDetail: value.portDetail,
            index: value.portDetail
        });

        hourArr.reduce((a, b) => Math.min(a.hour, b.hour));
        minuteArr.reduce((a, b) => Math.min(a.minute, b.minute));

        minData.push(hourArr[0].hour);
        minData.push(minuteArr[0].minute);
        const min = minData.reduce((a, b) => Math.min(a, b));

        console.log("minData--", min);
    })


}