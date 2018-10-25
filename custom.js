document.addEventListener("DOMContentLoaded", function (event) {
    //console.log("DOM fully loaded and parsed");

    var todo_input = document.getElementById("todo-input");
    var todo_preview = document.getElementById("todo-preview");
    var todo_form = document.getElementById("todo-form");
    var todo_add_form = document.getElementById("todo-add-form");
    var btn_done = document.getElementById("btn-done");
    var btn_remove = document.getElementById("btn-remove");

    var todo_obj = [];


    //DIsplay text input preview
    todo_input.oninput = function () {
        todo_preview.innerHTML = todo_input.value;
    };

    //Remove button
    btn_remove.onclick = function (event) {
        event.preventDefault();
        var selected_item = todo_form.querySelector("input[name=todo-item]:checked");
        if(selected_item) {
            todo_obj.splice(selected_item.value, 1);
            displayRadioButtons();
            console.log(selected_item.value);
        } else {
            alert("Please select item to remove");
        }
    };

    //Done button
    btn_done.onclick = function (event) {
        event.preventDefault();
        var selected_item = todo_form.querySelector("input[name=todo-item]:checked");
        if(selected_item) {
            var selected_item_name = todo_obj[selected_item.value].name;
            todo_obj.splice(selected_item.value, 1, {name: selected_item_name, status: 'yes'});
            displayRadioButtons();
        } else {
            alert("Please select item to make as done");
        }
    };

    //Add form submit
    todo_add_form.onsubmit = function (event) {
        event.preventDefault();
        todo_obj.push({name: todo_input.value, status: 'no'});
        displayRadioButtons();
        this.reset();
        todo_preview.innerHTML= '';
    };


    /**********************************
     * Helper Functions
     **********************************/

    //Display radio buttons
    function displayRadioButtons() {
        todo_form.innerHTML = '';
            for (var i in todo_obj) {
                var todo_item = makeRadioButton("todo-item", i, todo_obj[i].name, todo_obj[i].status);
                todo_form.appendChild(todo_item);
        }
        console.log(todo_obj);
    }

    //Generate radio button HTML
    function makeRadioButton(name, value, text, status) {

        var label = document.createElement("label");
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = name;
        radio.value = value;

        var att = document.createAttribute("data-status");
        att.value = status;
        label.setAttributeNode(att);

        label.appendChild(radio);

        label.appendChild(document.createTextNode(text));
        return label;
    }

});