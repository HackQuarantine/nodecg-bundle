const countdown_replicant = nodecg.Replicant("countdown");

document.getElementById("countdown_active").onclick = () => {
    countdown_replicant.value = {
        'active': document.getElementById("countdown_active").checked,
        'date': countdown_replicant.value['date'],
        'time': countdown_replicant.value['time'],
        'text': countdown_replicant.value['text'],
    }
}

document.getElementById("countdown_submit").onclick = () => {
    countdown_replicant.value = {
        'active': document.getElementById("countdown_active").checked,
        'date': document.getElementById("countdown_date").value,
        'time': document.getElementById("countdown_time").value,
        'text': document.getElementById("countdown_text").value
    };
}

countdown_replicant.on('change', (newValue, oldValue) => {
    if (typeof(newValue) === "object") {
        document.getElementById("countdown_date").value = newValue.date;
        document.getElementById("countdown_time").value = newValue.time;
        document.getElementById("countdown_active").checked = newValue.active;
        document.getElementById("countdown_text").value = newValue.text;
    }
});