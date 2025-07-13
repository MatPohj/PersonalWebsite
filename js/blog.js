document.addEventListener('DOMContentLoaded', function() {
    // Get base path for GitHub Pages compatibility
    const basePath = getBasePath();
    
    // Load the blog posts metadata with the correct relative path
    fetch(`${basePath}blogs/metadata.json`)
        .then(response => response.json())
        .then(posts => {
            displayBlogList(posts);
            
            // Check if a specific blog post is requested via URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('post');
            
            if (postId) {
                const post = posts.find(p => p.id === postId);
                if (post) {
                    loadBlogPost(post, basePath);
                }
            }
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            document.getElementById('blog').innerHTML += '<p>Error loading blog posts. Please try again later.</p>';
        });
});

// Helper function to get the correct base path
function getBasePath() {
    // Get the pathname and split it
    const pathSegments = window.location.pathname.split('/');
    
    // Remove the last segment (current file)
    pathSegments.pop();
    
    // Join the remaining segments and add a trailing slash
    return pathSegments.join('/') + '/';
}

function displayBlogList(posts) {
    const blogSection = document.getElementById('blog');
    
    // Clear any existing content except the title
    const blogTitle = blogSection.querySelector('h1');
    blogSection.innerHTML = '';
    blogSection.appendChild(blogTitle);
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Remove the loading spinner if it exists
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
    
    // Add each post to the page
    posts.forEach(post => {
        const entryBox = document.createElement('div');
        entryBox.className = 'entry-box blog-entry';
        entryBox.innerHTML = `
            <span class="entry-date">${formatDate(post.date)}</span>
            <h3><a href="blog.html?post=${post.id}" class="blog-title">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <a href="blog.html?post=${post.id}" class="read-more">Read more</a>
        `;
        blogSection.appendChild(entryBox);
    });
}

function loadBlogPost(post, basePath) {
    const blogSection = document.getElementById('blog');
    
    // Fetch the markdown content with the correct path
    fetch(`${basePath}blogs/${post.file}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            // Clear the blog section
            blogSection.innerHTML = '';
            
            // Add back button
            const backLink = document.createElement('a');
            backLink.href = 'blog.html';
            backLink.className = 'back-link';
            backLink.innerHTML = '&larr; Back to all posts';
            blogSection.appendChild(backLink);
            
            // Create post container
            const postContainer = document.createElement('div');
            postContainer.className = 'blog-post';
            
            // Add post header
            const postHeader = document.createElement('div');
            postHeader.className = 'blog-post-header';
            postHeader.innerHTML = `
                <h1>${post.title}</h1>
                <span class="entry-date">${formatDate(post.date)}</span>
            `;
            
            // Add post content
            const postContent = document.createElement('div');
            postContent.className = 'blog-post-content';
            postContent.innerHTML = convertMarkdownToHtml(markdown);
            
            // Append everything to the container
            postContainer.appendChild(postHeader);
            postContainer.appendChild(postContent);
            blogSection.appendChild(postContainer);
            
            // Update page title
            document.title = `${post.title} - Matti Pohjanoksa's Blog`;
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            blogSection.innerHTML += `<p>Error loading blog post: ${error.message}. Please try again later.</p>`;
        });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function convertMarkdownToHtml(markdown) {
    // For now, we'll use a basic implementation
    // In a real project, you would use a library like marked.js
    
    // Convert headers
    markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Convert paragraphs
    markdown = markdown.replace(/^\s*(\n)?(.+)/gm, function(m) {
        return /\<(\/)?(h|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
    });
    
    // Convert bold and italic
    markdown = markdown.replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.*)\*/gm, '<em>$1</em>');
    
    // Convert links
    markdown = markdown.replace(/\[([^\[]+)\]\(([^\)]+)\)/gm, '<a href="$2">$1</a>');
    
    // Convert line breaks
    markdown = markdown.replace(/^\n$/gm, '<br />');
    
    // Convert lists
    markdown = markdown.replace(/^\s*[-*+]\s+(.*)/gm, '<li>$1</li>');
    markdown = markdown.replace(/<\/li>\n<li>/g, '</li><li>');
    markdown = markdown.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
    
    return markdown;
}