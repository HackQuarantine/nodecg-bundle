function is_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/*
const http = new XMLHttpRequest();

http.onreadystatechange = (e) => {
    response = http.responseText;
    console.log(http);
    if (is_json(response)) {
        response_json = JSON.parse(response);
        console.log(response_json);
        var recent_track = response_json.recenttracks.track[0];
        console.log(recent_track);
        set_now_playing(recent_track);
    }
}
*/

const lastfm_data = {
    baseURL: "https://ws.audioscrobbler.com/2.0/",
    method: "user.getrecenttracks",
    user: lastfm_user,
    api_key: lastfm_api_key,
    additional: "&format=json&limit=1"
};

var now_playing = null;

function set_now_playing(val) {
    if (now_playing === null || now_playing.name !== val.name || now_playing.artist !== val.artist) {
        now_playing = val;

        show_now_playing(now_playing.name, now_playing.artist, 5000);
    }
}

function get_lastfm() {
    url = sprintf("%s?method=%s&user=%s&api_key=%s%s", lastfm_data.baseURL, lastfm_data.method, lastfm_data.user, lastfm_data.api_key, lastfm_data.additional);
    console.log(url);
    fetch(url).then(function(response) {
        console.log(response);
    }).then(function(data) {
        console.log(data);
    });
}

/*function get_lastfm_old() {
    $.ajax({
        type: "GET",
        url:
            lastfm_data.baseURL +
            lastfm_data.user +
            "&api_key=" +
            lastfm_data.api_key +
            lastfm_data.additional,
        dataType: "json",
        success: function(resp) {
            console.log("Success!");
            var recentTrack = resp.recenttracks.track[0];
            console.log(recentTrack);
            var formatted =
                "<img src='https://i.imgur.com/EgWjJry.png'>" + recentTrack.name;
            $("a#tracktitle")
                .html(formatted)
                .attr("href", recentTrack.url)
                .attr("title", recentTrack.name + " by " + recentTrack.artist["#text"])
                .attr("target", "_blank");

            var artistFormatted =
                "<img src='https://i.imgur.com/fae5XZA.png'>" +
                recentTrack.artist["#text"];
            $("a#trackartist")
                .html(artistFormatted)
                .attr("title", "Artist : " + recentTrack.artist["#text"]);
            $("img#trackart").attr("src", recentTrack.image[2]["#text"]);
        },
        error: function(resp) {
            console.log("Error!");
            console.log(resp);
            $("a#tracktitle").html(
                "<img src='https://i.imgur.com/EgWjJry.png'>" + "Silence!"
            );
            $("img#trackart").attr("src", "https://i.imgur.com/Q6cCswP.jpg");
            var artistFormatted =
                "<img src='https://i.imgur.com/fae5XZA.png'>Prashant Shrestha";
            $("a#trackartist")
                .html(artistFormatted)
                .attr("href", "www.prashant.me/");
        }
    });
};*/

// Get the new one.
//getSetLastFM();
// Start the countdown.
//setInterval(getSetLastFM, 10 * 1000);
