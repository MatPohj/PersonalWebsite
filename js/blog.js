// Global variable to store all posts
let allPosts = [];

document.addEventListener('DOMContentLoaded', function() {
    // Get base path for GitHub Pages compatibility
    const basePath = getBasePath();
    
    // Load the blog posts metadata with the correct relative path
    fetch(`${basePath}blogs/metadata.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            allPosts = posts; // Store posts globally
            displayBlogList(posts);
            
            // Set up sort functionality
            setupSortControls();
            
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
            document.getElementById('blog').innerHTML += `<p>Error loading blog posts: ${error.message}</p>`;
        });
});

// Helper function to get the correct base path
function getBasePath() {
    const path = window.location.pathname;
    
    // Check if we're in the blog directory
    if (path.includes('/blog/') || path.endsWith('/blog')) {
        return '../';
    }
    
    // We're in the root directory
    return './';
}

function setupSortControls() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortOrder = this.value;
            displayBlogList(allPosts, sortOrder);
        });
    }
}

function sortPosts(posts, order = 'desc') {
    // Separate pinned and regular posts
    const pinnedPosts = posts.filter(post => post.pinned);
    const regularPosts = posts.filter(post => !post.pinned);
    
    // Sort regular posts by date
    const sortedRegularPosts = regularPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    // Sort pinned posts by date (in case there are multiple)
    const sortedPinnedPosts = pinnedPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    // Return pinned posts first, then regular posts
    return [...sortedPinnedPosts, ...sortedRegularPosts];
}

function displayBlogList(posts, sortOrder = 'desc') {
    const blogSection = document.getElementById('blog');
    
    // Remove existing blog entries but keep title and controls
    const existingEntries = blogSection.querySelectorAll('.blog-entry');
    existingEntries.forEach(entry => entry.remove());
    
    // Sort posts with pinned posts handling
    const sortedPosts = sortPosts(posts, sortOrder);
    
    // Remove the loading spinner if it exists
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
    
    // Add each post to the page
    sortedPosts.forEach(post => {
        const entryBox = document.createElement('div');
        entryBox.className = `entry-box blog-entry${post.pinned ? ' pinned-post' : ''}`;
        entryBox.innerHTML = `
            ${post.pinned ? '<div class="pinned-badge">📌 Pinned</div>' : ''}
            <span class="entry-date">${formatDate(post.date)}</span>
            <h3><a href="?post=${post.id}" class="blog-title">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            <div class="blog-links">
                <a href="?post=${post.id}" class="read-more">Read more</a>
                ${post.githubUrl ? `<a href="${post.githubUrl}" target="_blank" rel="noopener noreferrer" class="github-link">View on GitHub</a>` : ''}
            </div>
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
            backLink.href = '.';  // Change from 'blog.html' to '.'
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
                ${post.githubUrl ? `<a href="${post.githubUrl}" target="_blank" rel="noopener noreferrer" class="github-link">View on GitHub</a>` : ''}
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
    return marked.parse(markdown);
}