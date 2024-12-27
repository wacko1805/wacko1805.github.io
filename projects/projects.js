        // Function to render projects
        function renderProjects(jsonData, containerId, projectClass, titleClass, contentClass, tagClass, urlClass) {
            const container = document.getElementById(containerId);
            
            // Clear the container before appending new projects
            container.innerHTML = '';

            jsonData.projects.project.forEach(project => {
                // Create the project container
                const projectDiv = document.createElement('div');
                projectDiv.classList.add(projectClass);

                // Title
                const title = document.createElement('h3');
                title.classList.add(titleClass);
                title.textContent = project.title || "No title available";
                projectDiv.appendChild(title);

                // Content
                const content = document.createElement('p');
                content.classList.add(contentClass);
                content.textContent = project.content || "No content available";
                projectDiv.appendChild(content);

                // Tags
                const tagsDiv = document.createElement('div');
                tagsDiv.classList.add('tags');
                if (project.tags) {
                    const tags = project.tags.split(',').map(tag => {
                        const tagSpan = document.createElement('span');
                        tagSpan.classList.add(tagClass);
                        tagSpan.textContent = tag.trim();
                        return tagSpan;
                    });
                    tagsDiv.append(...tags);
                }
                projectDiv.appendChild(tagsDiv);

                // url
                const url = document.createElement('p');
                url.classList.add(urlClass);
                url.textContent = `url: ${project.url || "Not available"}`;
                projectDiv.appendChild(url);

                // Append the project div to the container
                container.appendChild(projectDiv);
            });
        }

        // Fetch data from projects.json and render it
        fetch('/projects.json')
            .then(response => response.json())
            .then(data => {
                renderProjects(
                    data, // The fetched JSON object
                    'projects', // Container ID in HTML
                    'project-container', // Project container class
                    'project-title', // Title class
                    'project-content', // Content class
                    'tag', // Tag class
                    'project-url' // url class
                );
            })
            .catch(error => {
                console.error("Error loading the JSON data:", error);
            });