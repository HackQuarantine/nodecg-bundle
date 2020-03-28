const nameInput = document.querySelector('#nameInput');
const submitButton = document.querySelector('#submitButton');

const popupReplicant = nodecg.Replicant('popup');

submitButton.onclick = () => {
	popupReplicant.value = {
        'title': 'Current Team',
        'text': nameInput.value,
        'delay': 5000,
        'lower': true
    };
};

const nameInput2 = document.querySelector('#nameInput2');
const submitButton2 = document.querySelector('#submitButton2');

submitButton2.onclick = () => {
	popupReplicant.value = {
        'title': 'Next Team',
        'text': nameInput2.value,
        'delay': 5000,
        'lower': true
    };
};