const button = document.getElementById('toggleClassBtn');
const cardDiv = document.querySelector('.cards');
const cardButton = document.querySelector('.toggleButton');

// Add an event listener to the button to toggle the 'closed' class
button.addEventListener('click', function() {
    cardDiv.classList.toggle('closed');
    cardButton.classList.toggle('closed2');
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {  // You can adjust the scroll value as needed
        cardDiv.classList.add('closed');
        cardButton.classList.add('closed2');
    } else {
        cardDiv.classList.remove('closed');
        cardButton.classList.remove('closed2');
    }
});