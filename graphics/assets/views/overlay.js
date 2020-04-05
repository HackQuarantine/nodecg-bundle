//
//  Placeholder data to render if nodecg is not running in the current environment.
//
if (typeof nodecg == 'undefined') {
    on_now(["Introduction to Android Development (Java)", "Will Russell", "Mar 28 17:00"]);
    up_next([
        ["Music with a HTML5-based Modular Synth", "Daniel Spencer", "Mar 31 17:00"],
        ["Introduction to Git and GitHub", "Will Russell", "Mar 31 21:00"],
    ]);
    
    stats_image("assets/img/logo.png");
    animTo(document.getElementById("stats_text"), "Default stats text box contains some default text for testing purposes.");
}

//
//  All NodeCG enabled code
//
if (typeof nodecg !== 'undefined') {
    //
    //  Start Countdown Logic
    //
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

    //
    //  End Countdown Logic
    //

    const on_now_replicant = nodecg.Replicant('on_now', 'hackproductions-nodecg-bundle');
    const up_next_replicant = nodecg.Replicant('up_next', 'hackproductions-nodecg-bundle');
    const messages_replicant = nodecg.Replicant('messages', 'hackproductions-nodecg-bundle');
    const messages_push_replicant = nodecg.Replicant('messages_push', 'hackproductions-nodecg-bundle');
    const sidebar_replicant = nodecg.Replicant('sidebar', 'hackproductions-nodecg-bundle');

    on_now_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object") {
            on_now(newValue);
        }
    });

    up_next_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object") {
            up_next(newValue);
        }
    });

    var cycle_elements = [];

    var cycle_index = -1;
    var cycle_delay = 60*1000;

    function cycle_next() {
        if (cycle_elements.length > 0) {
            cycle_index = (cycle_index + 1) % cycle_elements.length;
            stats_image(cycle_elements[cycle_index].image);
            animTo(document.getElementById("stats_text"), cycle_elements[cycle_index].text);
        } else {
            stats_image("");
            animTo(document.getElementById("stats_text"), "");
        }
    }

    function cycle_start() {
        setInterval(cycle_next, cycle_delay);
        setTimeout(cycle_next, 2000);
    }


    var started = false;
    messages_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object") {
            do_next = cycle_elements.length == 0 | newValue.length == 0;
            cycle_elements = newValue;
            if (started && do_next) {
                cycle_next();
            }
        }
    });
    cycle_start();
    setTimeout(function() {
        started = true;
    }, 1000);

    messages_push_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object" && newValue.new) {
            cycle_index = newValue.index - 1;
            if (newValue.now) {
                cycle_next();
            }
        }
    });

    sidebar_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "boolean") {
            if (newValue) {
                document.getElementById("left").classList.remove("hidden");
                document.getElementById("bottom_left").classList.remove("thin");
                document.getElementById("bottom").classList.remove("thin");
            } else {
                document.getElementById("left").classList.add("hidden");
                document.getElementById("bottom_left").classList.add("thin");
                document.getElementById("bottom").classList.add("thin");
            }
        }
    });
}
