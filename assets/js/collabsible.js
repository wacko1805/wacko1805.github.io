const button = document.getElementById('toggleClassBtn');
const cardDiv = document.querySelector('.cards');
const cardButton = document.querySelector('.toggleButton');

// Functions to add and remove classes
function addClosedClasses() {
    cardDiv.classList.add('closed');
    cardButton.classList.add('closed2');
}

function removeClosedClasses() {
    cardDiv.classList.remove('closed');
    cardButton.classList.remove('closed2');
}

function toggleClosedClasses() {
    cardDiv.classList.toggle('closed');
    cardButton.classList.toggle('closed2');
}

// Add an event listener to the button to toggle the 'closed' class
button.addEventListener('click', toggleClosedClasses);

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {  // You can adjust the scroll value as needed
        addClosedClasses();
    } else {
        removeClosedClasses();
    }
});
