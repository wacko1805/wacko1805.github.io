var projects = "projects/";
var photos = "photos/";
var about = "/index.html#AboutMe";
var blog = "";

var projectsButton = document.getElementById("projects");
var photosButton = document.getElementById("photos");
var aboutButton = document.getElementById("about");
var blogButton = document.getElementById("blog");


projectsButton.addEventListener("click", function() {
    window.open(projects); 
});

photosButton.addEventListener("click", function() {
    window.open(photos); 
});

aboutButton.addEventListener("click", function() {
    window.open(about); 
});

blogButton.addEventListener("click", function() {
    window.open(blog); 
});

