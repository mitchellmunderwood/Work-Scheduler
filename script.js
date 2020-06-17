
// array with time slots
var times = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// columnEl declaration
var column = $(".col-12");

// create schedule and load from localstorage if possible
let schedule = {};
if (localStorage.getItem("schedule")) {
    schedule = JSON.parse(localStorage.getItem("schedule"));
}

// console.log(schedule);

function init() {
    // set up the html elements for the times
    times.forEach(function (el) {

        var block = $("<div>");
        block.attr("class", "block");

        var time = $("<p>");
        time.attr("class", "block-time");
        time.text(timeString(el));
        block.append(time);

        var desc = $("<input>");
        desc.attr("class", "block-desc");
        desc.attr("time", el);

        // check for presence of activity, if none exists, set schedule time for null
        if (schedule[el]) {
            desc.attr("value", schedule[el]);
            console.log("found")
        } else {
            schedule[el] = "";
        }

        desc.css("background", timeColor(el));

        block.append(desc);

        var save = $("<button>");
        save.attr("class", "block-save");
        save.attr("time", el);

        var icon = $("<i>");
        icon.attr("class", "fa fa-floppy-o");
        save.append(icon);

        block.append(save);

        // set up event listeners for save buttons as they are created
        save.on("click", function (event) {
            event.preventDefault();
            var curr_desc = $(this).prev();
            var curr_time = curr_desc.attr("time");
            var curr_desc_text = curr_desc[0]["value"];
            schedule[curr_time] = curr_desc_text
            localStorage.setItem("schedule", JSON.stringify(schedule));
        })

        column.append(block);
    })
}

// determine background color based on time
function timeColor(el) {
    let hours = moment().hour();
    if (el < hours) {
        return "#d3d3d3";
    } else if (el === hours) {
        return "#ff6961";
    } else {
        return "#77dd77";
    }
}

// Turns time from military time into standard time
function timeString(el) {
    // console.log("timeString", el);
    if (el < 12) {
        return el + "AM"
    } else if (el === 12) {
        return el + "PM"
    } else if (el > 12) {
        return ((el - 12) + "PM")
    }
}

// Constants and function to post date at the top of the page when opened
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function initDate() {
    var weekday = weekdays[moment().day()];
    var monthday = moment().date();
    var month = months[moment().month()];
    var year = moment().year();
    $("#currentDay").text(weekday + ", " + month + " " + monthday + ", " + year);
}

// call functions when the page is opened
init();
initDate();


