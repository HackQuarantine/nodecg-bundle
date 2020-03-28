const http = new XMLHttpRequest();
const url = sprintf("https://www.googleapis.com/calendar/v3/calendars/%s%%40group.calendar.google.com/events?key=%s", CLIENT, API_KEY)

function is_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function request_events() {
    http.open("GET", url);
    http.send();
}

function format_events(events) {
    items = events.items;
    events_formatted = [];
    for (var i = 0; i < items.length; i++) {
        e = {
            'name': items[i].summary,
            'start': new Date(items[i].start.dateTime),
            'end': new Date(items[i].end.dateTime),
        }
        if (is_json(items[i].description)) {
            description = JSON.parse(items[i].description)
            if (description.organiser) {
                e.person = description.organiser;
            } else {
                e.person = "HackQuarantine Team";
            }
        } else {
            e.person = "";
        }
        d = e.start;
        month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
        day = ('0' + d.getUTCDate()).slice(-2);
        hour = ('0' + d.getUTCHours()).slice(-2);
        minute = ('0' + d.getUTCMinutes()).slice(-2);
        second = ('0' + d.getUTCSeconds()).slice(-2);
        e.date = d.getUTCFullYear() + "-" + month + "-" + day;
        e.time = hour + ":" + minute + ":" + second;
        events_formatted.push(e);
    }
    events_formatted = events_formatted.sort(function(a, b) {
        return a.start - b.start;
    }).filter(function(a) {
        return a.end - new Date() > 0;
    });

    return events_formatted;
}

function populate_fields(events) {
    document.getElementById("on_now_name").value = events[0].name;
    document.getElementById("on_now_person").value = events[0].person
    document.getElementById("on_now_date").value = events[0].date;
    document.getElementById("on_now_time").value = events[0].time;

    up_nexts = document.getElementById("up_nexts").getElementsByClassName("up_next")
    while (up_nexts.length > 0) {
        up_nexts[0].remove();
    }
    for (var i = 1; i < events.length; i++) {
        event_name = events[i].name;
        person = events[i].person;
        date = events[i].date;
        time = events[i].time;
        var node = document.createElement("div");
        node.classList.add("up_next");
        node.innerHTML = sprintf(row_html, event_name, person, date, time); // row_html is in overlay.html
        document.getElementById("up_nexts").appendChild(node);
    }
}

http.onreadystatechange = (e) => {
    response = http.responseText;
    if (is_json(response)) {
        events = format_events(JSON.parse(response));
        if (events.length > 0) {
            populate_fields(events.slice(0,10));
        }
        //console.log(JSON.parse(response));
    }
}
