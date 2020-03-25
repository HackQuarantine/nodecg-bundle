const popupReplicant = nodecg.Replicant('popup');

document.getElementById("submit_button").onclick = () => {
    popupReplicant.value = {
        'title': document.getElementById("headline").value,
        'text': document.getElementById("contents").value,
        'delay': document.getElementById("delay").value,
        'lower': document.getElementById("lower").checked
    };
};

const nowPlayingReplicant = nodecg.Replicant("now-playing");

document.getElementById("now-playing").onclick = () => {
    nowPlayingReplicant.value = document.getElementById("now-playing").checked;
}

nowPlayingReplicant.on('change', (newValue, oldValue) => {
    if (typeof(newValue) === "boolean") {
        document.getElementById("now-playing").checked = newValue;
    }
});

const popupCountdownReplicant = nodecg.Replicant('popup-countdown');

document.getElementById("countdown-submit").onclick = () => {
    popupCountdownReplicant.value = {
        'cancel': false,
        'title': document.getElementById("countdown-headline").value,
        'date': document.getElementById("countdown-date").value,
        'time': document.getElementById("countdown-time").value,
    };
};

document.getElementById("countdown-cancel").onclick = () => {
    popupCountdownReplicant.value = {
        'cancel': true,
        'title': document.getElementById("countdown-headline").value,
        'date': document.getElementById("countdown-date").value,
        'time': document.getElementById("countdown-time").value,
    };
};

popupCountdownReplicant.on('change', (newValue, oldValue) => {
    if (typeof(newValue) === "object") {
        document.getElementById("countdown-headline").value = newValue.title;
        document.getElementById("countdown-date").value = newValue.date;
        document.getElementById("countdown-time").value = newValue.time;
    }
});

