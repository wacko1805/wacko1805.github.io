var projects = "/projects/";
var photos = "/photos/";
var about = "/#AboutMe";
var blog = "";

var projectsButton = document.getElementById("projects");
var photosButton = document.getElementById("photos");
var aboutButton = document.getElementById("about");
var blogButton = document.getElementById("blog");

function navigateWithClassAddition(url) {
    addClosedClasses();
    localStorage.setItem("isClosed", "true"); // Save the state
    setTimeout(function() {
        window.location.href = url; // Navigate after a short delay
    }, 500);
}

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("isClosed") === "true") {
        addClosedClasses();
    }
});



projectsButton.addEventListener("click", function() {
    navigateWithClassAddition(projects);
});

photosButton.addEventListener("click", function() {
    navigateWithClassAddition(photos);
});

aboutButton.addEventListener("click", function() {
    navigateWithClassAddition(about);
});

blogButton.addEventListener("click", function() {
    navigateWithClassAddition(blog);
});
