if (typeof nodecg !== 'undefined') {
    const on_now_replicant = nodecg.Replicant('on_now', 'hackproductions-nodecg-bundle');
    const up_next_replicant = nodecg.Replicant('up_next', 'hackproductions-nodecg-bundle');
    const messages_replicant = nodecg.Replicant('messages', 'hackproductions-nodecg-bundle');
    const messages_push_replicant = nodecg.Replicant('messages_push', 'hackproductions-nodecg-bundle');
    const countdown_replicant = nodecg.Replicant('countdown', 'hackproductions-nodecg-bundle');
    const sidebar_replicant = nodecg.Replicant('sidebar', 'hackproductions-nodecg-bundle');

    countdown_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object") {
            countdown_endtime = newValue.date + "T" + newValue.time;
        }
    });

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

    /*stats_replicant.on('change', (newValue, oldValue) => {
        if (newValue.image !== undefined) {
            stats_image(newValue.image);
            animTo(document.getElementById("stats_text"), newValue.text);
        }
    });*/

    messages_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object") {
            cycle_elements = newValue;
        }
    });
    cycle_start();

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
            } else {
                document.getElementById("left").classList.add("hidden");
            }
        }
    });
} else {
    on_now(["Introduction to Android Development (Java)", "Will Russell", "Mar 28 17:00"]);
    up_next([
        ["Music with a HTML5-based Modular Synth", "Daniel Spencer", "Mar 31 17:00"],
        ["Introduction to Git and GitHub", "Will Russell", "Mar 31 21:00"],
    ]);
    
    stats_image("assets/img/logo.png");
    animTo(document.getElementById("stats_text"), "Default stats text box contains some default text for testing purposes.")
}
initialize_countdown();
