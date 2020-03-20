const popupReplicant = nodecg.Replicant('popup');

document.getElementById("submit_button").onclick = () => {
	popupReplicant.value = {
        'title': document.getElementById("headline").value,
        'text': document.getElementById("contents").value,
        'delay': document.getElementById("delay").value,
        'lower': document.getElementById("lower").checked
    };
};