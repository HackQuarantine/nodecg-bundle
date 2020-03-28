const lastfm_data = {
    baseURL: "https://ws.audioscrobbler.com/2.0/",
    method: "user.getrecenttracks",
    user: lastfm_user,
    api_key: lastfm_api_key,
    additional: "&format=json&limit=1"
};

var now_playing = null;
var now_playing_waiting = false;

function set_now_playing(val) {
    if (now_playing === null || now_playing.name !== val.name || now_playing.artist['#text'] !== val.artist['#text']) {
        now_playing = val;
        if (!now_playing_waiting) {
            now_playing_waiting = true;
            setTimeout(function() {
                show_now_playing(now_playing.name, now_playing.artist['#text'], 5000);
                setTimeout(function() {
                    now_playing_waiting = false;
                }, 9000);
            }, 3000);
        }
    }
}

function get_lastfm() {
    fetch(lastfm_data.baseURL + "?method=" + lastfm_data.method + "&user=" + lastfm_data.user + "&api_key=" + lastfm_data.api_key + lastfm_data.additional).then(function(response) {
        return response.json();
    }).then(function(data) {
        set_now_playing(data.recenttracks.track[0]);
    });
}

var now_playing_interval = null;

setTimeout(function() {
    if (typeof nodecg !== 'undefined') {
        const nowPlayingReplicant = nodecg.Replicant('now-playing', 'hackproductions-nodecg-bundle');

        // Change will be called when the Replicant loads too, so we can use it to set the initial value.
        nowPlayingReplicant.on('change', (newValue, oldValue) => {
            if (typeof(newValue) === "boolean" && newValue) {
                if (now_playing_interval === null) {
                    get_lastfm();
                    now_playing_interval = setInterval(get_lastfm, 5 * 1000);
                }
            } else {
                clearInterval(now_playing_interval);
                now_playing_interval = null;
            }
        });
    } else {
        // Get the new one.
        get_lastfm();
        // Start the countdown.
        now_playing_interval = setInterval(get_lastfm, 5 * 1000);
    }
}, 100);
