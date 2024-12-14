const imagesPerLoad = 15;
let currentIndex = 0;
const imageContainer = document.getElementById('imageContainer');
const loadingIndicator = document.getElementById('loading');
const dir = "https://jacks.am/images/";

// Fetch the JSON data from pictures.json
fetch('photos.json')
    .then(response => response.json())
    .then(imagesData => {
        // Function to load images dynamically
        function loadImages() {
            const imagesToLoad = imagesData.slice(currentIndex, currentIndex + imagesPerLoad);
            imagesToLoad.forEach(image => {
                // Create the div element with class 'image-item'
                const divElement = document.createElement('div');
                divElement.classList.add('image-item');
                
                // Create the img element
                const imgElement = document.createElement('img');
                imgElement.src = dir + image.location;
                imgElement.alt = image.title;
                
                // Append the img element to the div
                divElement.appendChild(imgElement);
                
                // Append the div to the imageContainer
                imageContainer.appendChild(divElement);
            });
            

            // Update the index for the next batch
            currentIndex += imagesToLoad.length;

            // Hide loading indicator if no more images to load
            if (currentIndex >= imagesData.length) {
                loadingIndicator.style.display = 'none';
            }
        }

        // Initial load
        loadImages();

        // Infinite scroll: load more images when scrolled to the bottom
        window.addEventListener('scroll', () => {
            // Debugging: Log scroll position and document height
            console.log('Scroll position:', window.scrollY, 'Document height:', document.documentElement.scrollHeight, 'Window height:', window.innerHeight);

            // Check if we're near the bottom of the page
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                console.log('Near bottom, loading more images...');

                // Only load images if not already loading
                    loadingIndicator.style.display = 'block';
                    loadImages();
                
            }
        });
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });