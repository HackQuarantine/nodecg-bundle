/*var cycle_elements = [
    {
        'image': 'assets/logo.png',
        'text': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu purus iaculis, porta eros porta, maximus purus."
    },
    {
        'image': 'assets/logo_small.png',
        'text': "Bottom Text"
    }
];*/
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
