// Load tags from tags.json
function loadTags() {
    fetch('tags.json')
        .then(response => response.json())
        .then(data => {
            const tagContainer = document.getElementById('tags');
            tagContainer.innerHTML = ''; // Clear existing content if any

            data.forEach(tagData => {
                const tag = tagData.tag;
                const spanElement = document.createElement('span');
                spanElement.id = tag;
                spanElement.textContent = tag; // Add tag text content
                spanElement.classList.add('tag'); // Add a common class for styling and event handling

                // Add click event to toggle 'active' class
                spanElement.addEventListener('click', () => {
                    spanElement.classList.toggle('active');
                    loadImagesByTags(); // Load and filter images when a tag is clicked
                });

                tagContainer.appendChild(spanElement);
            });
        })
        .catch(error => {
            console.error('Error fetching tags:', error);
        });
}

// Load images from photos.json
const imagesPerLoad = 15;
let imagesData = []; // Store images data globally
const imageContainer = document.getElementById('imageContainer');
const loadingIndicator = document.getElementById('loading');
const dir = "dir/";

fetch('photos.json')
    .then(response => response.json())
    .then(data => {
        imagesData = data; // Store images data for filtering
        loadInitialImages(); // Initial load of the first batch
    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });

// Function to load initial images
function loadInitialImages() {
    const imagesToLoad = imagesData.slice(0, imagesPerLoad);
    appendImagesToContainer(imagesToLoad);
}

// Function to append images to the container
function appendImagesToContainer(images) {
    images.forEach(image => {
        // Avoid duplicating images
        if (document.getElementById(image.location)) return;

        const divElement = document.createElement('div');
        divElement.classList.add('image-item');
        divElement.id = image.location; // Use image location as unique ID
        divElement.dataset.tags = image.tags; // Store tags as a dataset for filtering

        const imgElement = document.createElement('img');
        imgElement.src = dir + image.location;
        imgElement.alt = image.title;

        // Add event listener to open image in overlay
        imgElement.addEventListener('click', () => {
            loadImageInOverlay(image);
        });

        divElement.appendChild(imgElement);
        imageContainer.appendChild(divElement);
    });
}

// Function to load images by active tags
function loadImagesByTags() {
    const activeTags = Array.from(document.querySelectorAll('.tag.active')).map(tag => tag.id);

    if (activeTags.length === 0) {
        // If no tags are active, show all images
        document.querySelectorAll('.image-item').forEach(imageItem => {
            imageItem.style.display = '';
        });
        return;
    }

    // Find and load images that match the active tags
    const matchingImages = imagesData.filter(image =>
        activeTags.some(tag => image.tags.split(',').map(t => t.trim()).includes(tag))
    );

    appendImagesToContainer(matchingImages);

    // Filter the displayed images
    document.querySelectorAll('.image-item').forEach(imageItem => {
        const imageTags = imageItem.dataset.tags.split(',').map(tag => tag.trim());
        if (activeTags.some(tag => imageTags.includes(tag))) {
            imageItem.style.display = '';
        } else {
            imageItem.style.display = 'none';
        }
    });
}

// Infinite scrolling functionality
let currentIndex = 0;

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        // Load more images if no tags are active
        if (Array.from(document.querySelectorAll('.tag.active')).length === 0) {
            const imagesToLoad = imagesData.slice(currentIndex, currentIndex + imagesPerLoad);
            appendImagesToContainer(imagesToLoad);
            currentIndex += imagesToLoad.length;

            if (currentIndex >= imagesData.length) {
                loadingIndicator.style.display = 'none';
            }
        }
    }
});

// Function to open image in overlay with updated download and share links
function loadImageInOverlay(image) {
    const overlay = document.getElementById('imageOverlay');
    const imageGrid = document.getElementById('imageContainer');
    const overlayImage = document.getElementById('overlayImage');
    const imageTitle = document.getElementById('imageTitle');
    const downloadLink = document.getElementById('downloadImage');
    const imageId = document.getElementById('imageId');


    if (overlay && overlayImage && imageTitle && downloadLink && imageId) {
        // Set the overlay image and title
        overlayImage.src = dir + image.location;
        imageTitle.textContent = image.title;
        imageId.textContent = image.id;

        // Update the download link
        downloadLink.href = overlayImage.src;
        downloadLink.download = image.location;

        // Show the overlay
        overlay.style.display = 'block';
        imageGrid.style.display = 'none';
    } else {
        console.error("Overlay or image elements are missing.");
    }
}

// Share button functionality
document.getElementById('shareImage').addEventListener('click', async (event) => {
    event.preventDefault();

    const overlayImage = document.getElementById('overlayImage');
    const imageTitle = document.getElementById('imageTitle');

    if (navigator.share && overlayImage.src) {
        try {
            await navigator.share({
                title: imageTitle.textContent,
                text: `Check out this image: ${imageTitle.textContent}`,
                url: `https://Jacks.am/photos/photo.html?p=${imageId.textContent}`,
            });
            console.log('Image shared successfully.');
        } catch (error) {
            console.error('Error sharing the image:', error);
        }
    } else {
        console.warn('Share API not supported or no image available.');
        alert('Sharing is not supported on this device or browser.');
    }
});

// Event listener for closing the overlay
document.getElementById('closeOverlay').addEventListener('click', (event) => {
    event.preventDefault();
    // Hide the overlay
    const overlay = document.getElementById('imageOverlay');
    const imageGrid = document.getElementById('imageContainer');
    if (overlay) {
        overlay.style.display = 'none';
        imageGrid.style.display = '';
    }
});

// Initialize tags
loadTags();
