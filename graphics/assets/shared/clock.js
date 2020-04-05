var countdown_endtime = null;
var countdown_endtime_event = null;
var is_event = null;

function initialize_countdown() {
    var days = document.getElementById("clock-d")
    var hours = document.getElementById("clock-h")
    var minutes = document.getElementById("clock-m")
    var seconds = document.getElementById("clock-s")

    function do_countdown() {
        endtime = is_event ? countdown_endtime_event : countdown_endtime;
        if (endtime !== null) {
            var t = get_time_remaining(endtime);
            days.innerHTML = ('0' + t.days).slice(-2);
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
        }
    }

    var timeinterval = setInterval(do_countdown, 1000);
    do_countdown();
}

function get_time_remaining(endtime){
    var t = Math.max(Date.parse(endtime) - Date.parse(new Date()), 0);
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
