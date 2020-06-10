var times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

var column = $(".col-12");

let schedule = {};

if (localStorage.getItem("schedule")) {
    schedule = JSON.parse(localStorage.getItem("schedule"));
}

var curr_time = Date();

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
        icon.attr("class", "bx bx-save");
        save.append(icon);
        block.append(save);

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

function timeColor(el) {
    let date = new Date();
    let hours = date.getHours();
    if (el < hours) {
        return "lightgrey";
    } else if (el === hours) {
        return "red";
    } else {
        return "lightgreen";
    }
}

function timeString(el) {
    // console.log("timeString", el);
    if (el < 12) {
        return el + ":00AM"
    } else if (el === 12) {
        return el + ":00PM"
    } else if (el > 12) {
        return ((el - 12) + ":00PM")
    }
}


init();



