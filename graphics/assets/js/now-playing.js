const lastfm_data = {
    baseURL: "https://ws.audioscrobbler.com/2.0/",
    method: "user.getrecenttracks",
    user: lastfm_user,
    api_key: lastfm_api_key,
    additional: "&format=json&limit=1"
};

var now_playing = null;
var now_playing_waiting = 0;

function set_now_playing(val) {
    if (now_playing === null || now_playing.name !== val.name || now_playing.artist['#text'] !== val.artist['#text']) {
        now_playing = val;
        now_playing_waiting += 1;
        setTimeout(function(val) {
            show_now_playing(val.name, val.artist['#text'], 5000);
            setTimeout(function() {
                now_playing_waiting -= 1;
            }, 8000);
        }.bind(self, val), (now_playing_waiting-1)*8000);
    }
}

function get_lastfm() {
    fetch(lastfm_data.baseURL + "?method=" + lastfm_data.method + "&user=" + lastfm_data.user + "&api_key=" + lastfm_data.api_key + lastfm_data.additional).then(function(response) {
        return response.json();
    }).then(function(data) {
        set_now_playing(data.recenttracks.track[0]);
    });
}

// Get the new one.
get_lastfm();
// Start the countdown.
setInterval(get_lastfm, 5 * 1000);
