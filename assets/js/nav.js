var projects = "/projects/";
var photos = "/photos/";
var about = "/#AboutMe";
var blog = "";

var projectsButton = document.getElementById("projects");
var photosButton = document.getElementById("photos");
var aboutButton = document.getElementById("about");
var blogButton = document.getElementById("blog");

projectsButton.addEventListener("click", function() {
    window.location.href = projects;  // Open in the current tab
});

photosButton.addEventListener("click", function() {
    window.location.href = photos;  // Open in the current tab
});

aboutButton.addEventListener("click", function() {
    window.location.href = about;  // Open in the current tab
});

blogButton.addEventListener("click", function() {
    window.location.href = blog;  // Open in the current tab
});
