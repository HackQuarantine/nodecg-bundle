//
//	Variables
//
let event = null;

//
//  Placeholder data to render if nodecg is not running in the current environment.
//
if (typeof nodecg == 'undefined') {
    event = {
    	'name': 'How to run a stream',
    	'person': 'Jon Kingsley',
    	'time': new Date(new Date().getDate() + 1).toString(),
    }
}

//
//  All NodeCG enabled code
//
if (typeof nodecg !== 'undefined') {
    //
    //  Define our replicant
    //
    const event_replicant = nodecg.Replicant('on_now_holding_view', 'hackproductions-nodecg-bundle');
    //
    //  Get the value for the replicant and store it
    //
    event_replicant.on('change', (value) => {
        event = value;
    });
}

//
//	Generic
//

//
//  Define our clock elements
//
const days = document.getElementById("clock-d");
const hours = document.getElementById("clock-h");
const minutes = document.getElementById("clock-m");
const seconds = document.getElementById("clock-s");

//
//  Define our update function
//
function do_countdown() {
    if (event !== null) {
    	// Handle showing/hiding the view
    	elem = document.getElementsByClassName("clock")[0];
    	
    	if (event.countdown) {
    		elem.classList.add("fadeIn");
    	    elem.classList.remove("transparent");
    	    elem.classList.remove("fadeOut");
    	} else {
    		// Debounce protection for reloads
    		if (!elem.classList.contains("transparent")) {
        	    elem.classList.remove("fadeIn");
        	    elem.classList.add("fadeOut");

                setTimeout(() => {
                    elem.classList.add("transparent");
                }, 1000);
        	}
    	}

    	// Handle setting the clock
        var t = get_time_remaining(event.date + "T" + event.time);
        days.innerHTML = ('0' + t.days).slice(-2);
        hours.innerHTML = ('0' + t.hours).slice(-2);
        minutes.innerHTML = ('0' + t.minutes).slice(-2);
        seconds.innerHTML = ('0' + t.seconds).slice(-2);

        // Handle setting the text
        document.getElementById("event-name").innerHTML = event.name;
        document.getElementById("event-person").innerHTML = event.person;
        document.getElementById("event-time").innerHTML = format_date(event.date, event.time);
    }
}

//
//  Kick off the countdown timer
//
setInterval(do_countdown, 1000);
do_countdown();