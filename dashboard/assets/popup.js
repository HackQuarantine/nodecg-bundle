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

