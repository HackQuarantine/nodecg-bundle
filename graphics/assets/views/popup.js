function show_now_playing(song, artist, delay) {
    document.getElementById("now-playing").classList.add("show");
    document.getElementById("now-playing-align-song").innerHTML = song;
    document.getElementById("now-playing-align-artist").innerHTML = artist;
    animToDur(document.getElementById("now-playing-song"), song, 1000);
    animToDur(document.getElementById("now-playing-artist"), artist, 1000);
    setTimeout(function() {
        animToDur(document.getElementById("now-playing-song"), "", 1000);
        animToDur(document.getElementById("now-playing-artist"), "", 1000);
        setTimeout(function() {
            document.getElementById("now-playing").classList.remove("show");
        }, 500);
        setTimeout(function() {
            document.getElementById("now-playing-align-song").innerHTML = "";
            document.getElementById("now-playing-align-artist").innerHTML = "";
        }, 1500);
    }, Number(delay)+1000);
}

function reveal_popup(headline, contents, delay, lower) {
    if (lower) {
        document.getElementById("popup").classList.add("lower");
        setTimeout(function() {
            document.getElementById("popup").classList.remove("lower");
        }, Number(delay)+4000);
    }

    document.getElementById("popup").classList.add("show");
    animToDur(document.getElementById("headline"), headline, 2000);
    animToDur(document.getElementById("contents"), contents, 2000);
    setTimeout(function() { 
        animToDur(document.getElementById("headline"), "", 2000);
        animToDur(document.getElementById("contents"), "", 2000);
        setTimeout(function() {
            document.getElementById("popup").classList.remove("show");
        }, 1000);
    }, Number(delay)+2000);
}

function reveal_popup_countdown(headline, endtime) {
    countdown_endtime = endtime;
    setTimeout(function() {
        document.getElementById("popup-countdown").classList.add("show");
        animToDur(document.getElementById("headline-countdown"), headline, 2000);
    }, 1000);
}

function hide_popup_countdown() {
    animToDur(document.getElementById("headline-countdown"), "", 2000);
    setTimeout(function() {
        document.getElementById("popup-countdown").classList.remove("show");
    }, 1000);
}

var show_popup = false;
var popup_timeout = null;

setTimeout(function() {
    if (typeof nodecg !== 'undefined') {
        const popupReplicant = nodecg.Replicant('popup', 'hackproductions-nodecg-bundle');
        const popupCountdownReplicant = nodecg.Replicant('popup-countdown', 'hackproductions-nodecg-bundle');

        popupReplicant.on('change', (newValue, oldValue) => {      
            if (show_popup && typeof(newValue) === "object") {
                reveal_popup(newValue.title, newValue.text, newValue.delay, newValue.lower);
            }
        });

        popupCountdownReplicant.on('change', (newValue, oldValue) => {
            if (show_popup && typeof(newValue) === "object") {
                clearTimeout(popup_timeout);
                if (!newValue.cancel) {
                    var millis;
                    if (newValue.tenseconds !== null) {
                        t = new Date();
                        t.setSeconds(t.getSeconds() + 11);
                        endtime = t.toString()
                    } else {
                        endtime = newValue.date + "T" + newValue.time;
                    }
                    millis = Math.max(Date.parse(endtime) - Date.parse(new Date()), 0);
                    if (millis > 0) {
                        reveal_popup_countdown(newValue.title, endtime);
                        popup_timeout = setTimeout(hide_popup_countdown, millis);
                    }
                } else {
                    hide_popup_countdown();
                }
            }
        });
    } else {
        reveal_popup("This is the title", "This is the subtitle", 7000);
    }
    countdown_endtime = "2000-01-01T12:00";
    initialize_countdown();
}, 100);

setTimeout(function() {
    show_popup = true;
}, 2000);
