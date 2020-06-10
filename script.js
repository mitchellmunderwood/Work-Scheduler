var times = ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00AM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM", "10:00PM"];

var column = $(".col-12");

let schedule = {};

if (localStorage.getItem("schedule")) {
    schedule = JSON.parse(localStorage.getItem("schedule"));
}

console.log(schedule);

function init() {
    // set up the html elements for the times
    times.forEach(function (el) {

        var block = $("<div>");
        block.attr("class", "block");

        var time = $("<p>");
        time.attr("class", "block-time");
        time.text(el);
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


init();



