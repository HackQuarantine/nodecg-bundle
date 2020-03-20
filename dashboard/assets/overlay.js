    function remove_row(button) {
        button.parentNode.remove();
    }

    function move_up(button) {
        element = button.parentNode;
        if(element.previousElementSibling) {
            element.parentNode.insertBefore(element, element.previousElementSibling);
        }
    }

    function move_down(button) {
        element = button.parentNode;
        if(element.nextElementSibling) {
            element.parentNode.insertBefore(element.nextElementSibling, element);
        }
    }

    function pop_on_now(button) {
        document.getElementById("on_now_name").value = button.parentNode.getElementsByClassName("up_next_name")[0].value;
        document.getElementById("on_now_person").value = button.parentNode.getElementsByClassName("up_next_person")[0].value;
        document.getElementById("on_now_date").value = button.parentNode.getElementsByClassName("up_next_date")[0].value;
        document.getElementById("on_now_time").value = button.parentNode.getElementsByClassName("up_next_time")[0].value;

        remove_row(button)
    }

    const row_html = `
        <input class="up_next_name" type="text" placeholder="Event Name" value="%s"></input>
        <input class="up_next_person" type="text" placeholder="Person" value="%s"></input>
        <input class="up_next_date" type="date" value="%s"></input>
        <input class="up_next_time" type="time" value="%s"></input>
        <button class="up_next_remove" onclick="remove_row(this);"><i class="fas fa-times"></i></input>
        <button class="up_next_up" onclick="move_up(this);"><i class="fas fa-arrow-up"></i></input>
        <button class="up_next_down" onclick="move_down(this);"><i class="fas fa-arrow-down"></i></input>
        <button class="up_next_pop" onclick="pop_on_now(this);">Pop</input>`

    const add_row = document.getElementById("up_next_add");
    add_row.addEventListener("click", function() {
        var node = document.createElement("div");
        node.classList.add("up_next");
        node.innerHTML = sprintf(row_html, "", "", "", "");
        document.getElementById("up_nexts").appendChild(node);
    });

    const message_row_html = `
        <input class="message_image" type="text" placeholder="Image URL" value="%s"></input>
        <input class="message_text" type="text" placeholder="Message" value="%s"></input>
        <button class="message_remove" onclick="remove_row(this);"><i class="fas fa-times"></i></input>
        <button class="message_up" onclick="move_up(this);"><i class="fas fa-arrow-up"></i></input>
        <button class="message_down" onclick="move_down(this);"><i class="fas fa-arrow-down"></i></input>
        <button class="message_now" onclick="message_push(this, true);">Now</input>
        <button class="message_next" onclick="message_push(this, false);">Next</input>`

    const message_add_row = document.getElementById("message_add");
    message_add_row.addEventListener("click", function() {
        var node = document.createElement("div");
        node.classList.add("message");
        node.innerHTML = sprintf(message_row_html, "", "");
        document.getElementById("messages").appendChild(node);
    });

    // ***************
    // * SUBMIT CODE *
    // ***************

    const on_now_replicant = nodecg.Replicant("on_now");
    const up_next_replicant = nodecg.Replicant("up_next");
    const messages_replicant = nodecg.Replicant("messages");
    const messages_push_replicant = nodecg.Replicant("messages_push");
    const sidebar_replicant = nodecg.Replicant("sidebar");

    function message_push(button, now) {
        element = button.parentNode;
        console.log(element);

        var i = 0;
        while (element.previousSibling.classList !== undefined && element.previousSibling.classList.contains("message")) {
            console.log(element.previousSibling);
            element = element.previousSibling;
            i++;
        }

        messages_push_replicant.value = {
            'index': i,
            'now': now,
            'new': true
        }

        setTimeout(function() {
            messages_push_replicant.value = {
                'new': false
            };
        }, 500);
    }

    document.getElementById("on_now_submit").onclick = () => {
        on_now_replicant.value = {
            'name': document.getElementById("on_now_name").value,
            'person': document.getElementById("on_now_person").value,
            'date': document.getElementById("on_now_date").value,
            'time': document.getElementById("on_now_time").value
        };
    }

    document.getElementById("up_next_submit").onclick = () => {
        events = [];
        elements = document.getElementById("up_nexts").getElementsByClassName("up_next");
        for (var i = 0; i < elements.length; i++) {
            e = {};
            e.name = elements[i].getElementsByClassName("up_next_name")[0].value;
            e.person = elements[i].getElementsByClassName("up_next_person")[0].value;
            e.date = elements[i].getElementsByClassName("up_next_date")[0].value;
            e.time = elements[i].getElementsByClassName("up_next_time")[0].value;
            events.push(e);
        }
        up_next_replicant.value = events;
    }

    document.getElementById("message_submit").onclick = () => {
        messages = [];
        elements = document.getElementById("messages").getElementsByClassName("message");
        for (var i = 0; i < elements.length; i++) {
            m = {};
            m.image = elements[i].getElementsByClassName("message_image")[0].value;
            m.text = elements[i].getElementsByClassName("message_text")[0].value;
            messages.push(m);
        }
        messages_replicant.value = messages;
    }

    document.getElementById("sidebar_active").onclick = () => {
        sidebar_replicant.value = document.getElementById("sidebar_active").checked;
    }

    // ***********************
    // * REINSERT PARAMETERS *
    // ***********************

    on_now_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object") {
            document.getElementById("on_now_name").value = newValue.name;
            document.getElementById("on_now_person").value = newValue.person;
            document.getElementById("on_now_date").value = newValue.date;
            document.getElementById("on_now_time").value = newValue.time;
        }
    });

    up_next_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object") {
            up_nexts = document.getElementById("up_nexts").getElementsByClassName("up_next")
            while (up_nexts.length > 0) {
                up_nexts[0].remove();
            }
            for (var i = 0; i < newValue.length; i++) {
                event_name = newValue[i].name;
                person = newValue[i].person;
                date = newValue[i].date;
                time = newValue[i].time;
                var node = document.createElement("div");
                node.classList.add("up_next");
                node.innerHTML = sprintf(row_html, event_name, person, date, time);
                document.getElementById("up_nexts").appendChild(node);
            }
        }
    });

    messages_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "object") {
            messages = document.getElementById("messages").getElementsByClassName("message")
            while (messages.length > 0) {
                messages[0].remove();
            }
            for (var i = 0; i < newValue.length; i++) {
                image = newValue[i].image;
                text = newValue[i].text;
                var node = document.createElement("div");
                node.classList.add("message");
                node.innerHTML = sprintf(message_row_html, image, text);
                document.getElementById("messages").appendChild(node);
            }
        }
    });

    sidebar_replicant.on('change', (newValue, oldValue) => {
        if (typeof(newValue) === "boolean") {
            document.getElementById("sidebar_active").checked = newValue;
        }
    });

    // *****************
    // * CALENDAR FILL *
    // *****************

    document.getElementById("calendar_fill").onclick = () => {
        request_events();
    }
