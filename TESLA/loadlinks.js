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
                    const redirectUrl = `https://www.youtube.com/redirect?q=${encodeURIComponent(app.url)}`;
                    
                    link.href = redirectUrl;
                    link.className = 'btn';
                    link.textContent = app.name;
                    
                    container.appendChild(link);
                });
            } catch (error) {
                container.innerHTML = `<p style="color:red">Error loading links.json: ${error.message}</p>`;
            }
        }

        // Run the function on page load
        loadLinks();