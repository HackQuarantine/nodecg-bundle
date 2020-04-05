//
//  Placeholder data to render if nodecg is not running in the current environment.
//
if (typeof nodecg == 'undefined') {
    // TODO
}

//
//  All NodeCG enabled code
//
if (typeof nodecg !== 'undefined') {
    //
    //  Define our replicant and temporary value storage variable
    //
    const countdown_replicant = nodecg.Replicant('countdown', 'hackproductions-nodecg-bundle');
    let countdown_value = null;

    //
    //  Get the value for the replicant and store it
    //
    countdown_replicant.on('change', (value) => {
        countdown_value = value;
    });

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
        if (countdown_value !== null) {
        	// Handle showing/hiding the view
        	elem = document.getElementsByClassName("clock")[0];
        	
        	if (countdown_value.active) {
        		elem.classList.add("fadeIn");
        	    elem.classList.remove("transparent");
        	    elem.classList.remove("fadeOut");
        	} else {
        		// Debounce protection for reloads
        		if (!elem.classList.contains("transparent")) {
            	    elem.classList.remove("fadeIn");
            	    elem.classList.add("fadeOut");
            	}
        	}

        	// Handle setting the text
            var t = get_time_remaining(countdown_value.date + "T" + countdown_value.time);
            days.innerHTML = ('0' + t.days).slice(-2);
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
        }
    }

    //
    //  Kick off the countdown timer
    //
    setInterval(do_countdown, 1000);
    do_countdown();
}

