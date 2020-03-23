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

var show_popup = false;

setTimeout(function() {
    if (typeof nodecg !== 'undefined') {
        const popupReplicant = nodecg.Replicant('popup', 'hackproductions-nodecg-bundle');

        // Change will be called when the Replicant loads too, so we can use it to set the initial value.
        popupReplicant.on('change', (newValue, oldValue) => {      
            if (show_popup && typeof(newValue) === "object") {
                reveal_popup(newValue.title, newValue.text, newValue.delay, newValue.lower);
            }
        });
    } else {
        reveal_popup("This is the title", "This is the subtitle", 7000);
    }
}, 100);

setTimeout(function() {
    show_popup = true;
}, 1000);
