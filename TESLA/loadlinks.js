async function loadLinks() {
    const container = document.getElementById('button-container');
    
    try {
        // Fetch the external JSON file
        const response = await fetch('links.json');
        const theaterApps = await response.json();
        
        // Clear the "Loading" text
        container.innerHTML = '';

        theaterApps.forEach(app => {
            const link = document.createElement('a');
            const redirectUrl = app.url;
            
            link.href = redirectUrl;
            link.className = 'btn';
            
            // 1. Create the image element
            const img = document.createElement('img');
            img.src = app.image; // Pulls the 'image' key from your JSON
            img.alt = app.name;
            

            // 2. Create a span for the text to keep it tidy
            const text = document.createElement('span');
            text.textContent = app.name;
            
            // 3. Append the image and text to the link
            link.appendChild(img);
            link.appendChild(text);
            
            container.appendChild(link);
        });
    } catch (error) {
        container.innerHTML = `<p style="color:red">Error loading links.json: ${error.message}</p>`;
    }
}

// Run the function on page load
loadLinks();