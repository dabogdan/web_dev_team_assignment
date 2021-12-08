let calendarTag = document.getElementById("calendar");

//global vars to render the calendar
let htmlContent = "";
let FebNumberOfDays;
let counter;

//getting the current date
const dateNow = new Date();//this is built-in JS object
let month = dateNow.getMonth();

const day = dateNow.getDate();
let year = dateNow.getFullYear();

//February has 28 and 29 days
if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
    FebNumberOfDays = 29;
} else {
    FebNumberOfDays = 28;
}

//arrays with names, since there are none in the Date().
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
const dayPerMonth = ["31", `${FebNumberOfDays}`, "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
let events = ['1st day of the month', '2nd day of the month', '3rd day of the month', undefined, '5th day of the month'];

//render the dates in the calendar with while loops
function renderDates (month) {
    htmlContent = '';
    counter = 1;
    weekdays = dayNames.indexOf(dayNames[new Date(year, month, 1).getDay()]); //get the number of the day of the week in current month
    weekdays2 = weekdays;//variable to render later the days of current month
    //white spaces btw the dates
    numOfDays = dayPerMonth[month];
    while (counter <= numOfDays) {
        while (weekdays > 0) {//empty days in the rable
            htmlContent += "<td class='monthPre'></td>";
            weekdays--;
        }
        if (weekdays2 > 6) {
            weekdays2 = 0;
            htmlContent += "</tr><tr>";
        }
        if (counter === day && month === dateNow.getMonth()) { // marks the current date
            htmlContent += `<td class='monthNow dayNow'> ${counter} </td>`;
        } else {
            htmlContent += `<td class='monthNow'>${counter}</td>`;
        }
        weekdays2++;
        counter++;
    }
}

function mapEventsToDates (daysPerMonth) {
    const dates = document.querySelectorAll('.monthNow');
    for (let i = 0; i < daysPerMonth; i++) {
        dates[i].setAttribute('onClick', 'showEvent(this, true);')
        if (events[i] != null) {
            dates[i].classList.add("eventMark");
            dates[i].setAttribute('eventTag', `${events[i]}`);
        } else {
            dates[i].setAttribute('eventTag', "There are no events. Please, select another date.");
        }
    }
}

function showEvent (e, c){
    if (c) {
        calendarTag.innerHTML = "<div class = 'eventTag' onclick='showEvent(null, false)'>" + "<button class='closeButton'> << </button><br><br>" + e.getAttribute('eventTag')  + "</div>";
    } else {
        renderCalendar()
    }
}

function renderCalendarBody () {
    let calendarBody = "<table class='calendar'> <tr class='yearNow'><th class='monthLeft' onClick='renderCalendar(-1)'><<</th><th colspan='5'>"
        + monthNames[month] + " " + year + "</th><th class='monthRight' onClick='renderCalendar(1)'>>></th></tr>";
    calendarBody += "<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>" +
        "<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
    calendarBody += "<tr>";
    calendarBody += htmlContent;
    calendarBody += "</tr></table>";
    calendarTag.innerHTML = calendarBody;
}

function renderCalendar(renderedMonth = month) {
    if (renderedMonth !== dateNow.getMonth()){
        month += renderedMonth;
        if(month >= 12) {
            month = 0;
            year += 1;
        } else if (month < 0) {
            month = 11;
            year -= 1;
        }
    }
    renderDates(month);
    renderCalendarBody();
    mapEventsToDates(numOfDays);
}