function on_now(event_details) {
    event_name = event_details[0];
    person = event_details[1];
    time = event_details[2];

    box = document.getElementById("on_now").getElementsByClassName("box")[0];
    box.classList.add("animated");
    box.classList.add("fadeOutLeft");
    setTimeout(function(box, event_name, person, time) {
        box.remove();

        box_text = sprintf(box_html, event_name, person, time);
        document.getElementById("on_now").innerHTML += box_text;
        box = document.getElementById("on_now").getElementsByClassName("box")[0];

        box.classList.remove("hidden");
        box.classList.add("animated");
        box.classList.add("fadeInLeft");
        setTimeout(function(box) {
            box.classList.remove("animated");
            box.classList.remove("fadeInLeft");
        }.bind(this, box), 1000);
    }.bind(this, box, event_name, person, time), 1000);
}

var up_next_delay = 100;
function up_next(events) {
    boxes = document.getElementById("up_next").getElementsByClassName("box");
    for (var i = 0; i < boxes.length; i++) {
        setTimeout(function(box) {
            box.classList.add("animated");
            box.classList.add("fadeOutLeft");
        }.bind(this, boxes[i]), i*up_next_delay);
    }
    setTimeout(function(boxes, events) {
        while (boxes.length > 0) {
            boxes[0].remove();
        }
        for (var i = 0; i < events.length; i++) {
            event_details = events[i];
            event_name = event_details[0];
            person = event_details[1];
            time = event_details[2];
            box = sprintf(box_html, event_name, person, time);
            document.getElementById("up_next").innerHTML += box;
        }

        boxes_new = document.getElementById("up_next").getElementsByClassName("box");
        for (var i = 0; i < boxes_new.length; i++) {
            setTimeout(function(box) {
                box.classList.remove("hidden");
                box.classList.add("animated");
                box.classList.add("fadeInLeft");
                setTimeout(function(box) {
                    box.classList.remove("animated");
                    box.classList.remove("fadeInLeft");
                }.bind(this, box), 1000);
            }.bind(this, boxes_new[i]), i*up_next_delay);
        }
    }.bind(this, boxes, events), boxes.length*up_next_delay + 1000);
}

function stats_image(image) {
    elem = document.getElementById("stats_image");
    elem.classList.add("animated");
    elem.classList.add("fadeOutDown");
    setTimeout(function(elem, image) {
        elem.children[0].src = image;
        elem.classList.remove("hidden");
        elem.classList.remove("fadeOutDown");
        elem.classList.add("fadeInUp");
        setTimeout(function(elem) {
            elem.classList.remove("animated");
            elem.classList.remove("fadeInUp");
        }.bind(this, elem), 1000);
    }.bind(this, elem, image), 1000);
}

var box_html = `
<div>
<div class="box hidden">
    <div class="name">
        %s
    </div>
    <div class="box_lower">
        <div class="person">
            <i class="far fa-user"></i>
            %s
        </div>
        <div class="time">
            <i class="far fa-clock"></i>
            %s
        </div>
    </div>
</div>
</div>`
