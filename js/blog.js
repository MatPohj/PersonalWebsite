// Global variable to store all posts
let allPosts = [];
let currentFilter = 'all';
let currentSortOrder = 'desc';

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
            // Enrich posts with category information for filtering
            const categorizedPosts = posts.map(addCategoryToPost);
            allPosts = categorizedPosts; // Store posts globally
            displayBlogList(allPosts, currentSortOrder, currentFilter);
            
            // Set up sort functionality
            setupSortControls();
            setupFilterControls();
            
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
            currentSortOrder = this.value;
            displayBlogList(allPosts, currentSortOrder, currentFilter);
        });
    }
}

function setupFilterControls() {
    const filterContainer = document.getElementById('filter-controls');
    if (!filterContainer) {
        return;
    }

    filterContainer.addEventListener('click', event => {
        const button = event.target.closest('button[data-filter]');
        if (!button) {
            return;
        }

        currentFilter = button.getAttribute('data-filter');

        // Toggle active state on buttons
        filterContainer.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.toggle('active', btn === button);
        });

        displayBlogList(allPosts, currentSortOrder, currentFilter);
    });
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

function displayBlogList(posts, sortOrder = 'desc', filter = currentFilter) {
    const blogSection = document.getElementById('blog');
    
    // Remove existing blog entries but keep title and controls
    const existingEntries = blogSection.querySelectorAll('.blog-entry');
    existingEntries.forEach(entry => entry.remove());
    
    // Filter and sort posts with pinned posts handling
    const filteredPosts = filterPosts(posts, filter);
    const sortedPosts = sortPosts(filteredPosts, sortOrder);
    
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

function filterPosts(posts, filter = 'all') {
    if (filter === 'all') {
        return posts;
    }
    return posts.filter(post => post.category === filter);
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
            
            // Add post content with file path and basePath for correct image handling
            const postContent = document.createElement('div');
            postContent.className = 'blog-post-content';
            
            // Pass basePath to the convertMarkdownToHtml function
            const htmlContent = convertMarkdownToHtml(markdown, post.file, basePath);
            postContent.innerHTML = htmlContent;
            
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

function addCategoryToPost(post) {
    const normalized = normalizeCategory(post.category);
    if (normalized) {
        return { ...post, category: normalized };
    }

    const filePath = post.file || '';
    if (filePath.startsWith('penetration_testing')) {
        return { ...post, category: 'pentesting' };
    }
    if (filePath.startsWith('network_attacks_and_reconnaissance')) {
        return { ...post, category: 'network' };
    }
    return { ...post, category: 'random' };
}

function normalizeCategory(category) {
    if (!category) {
        return '';
    }
    const lower = category.toLowerCase();
    if (lower.includes('pentest')) {
        return 'pentesting';
    }
    if (lower.includes('network')) {
        return 'network';
    }
    if (lower === 'random') {
        return 'random';
    }
    return lower;
}
function convertMarkdownToHtml(markdown, filePath = '', basePath = '') {
    const md = window.markdownit({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
    });
    
    // Get the directory path from the filePath
    const dirPath = filePath.includes('/') 
        ? filePath.substring(0, filePath.lastIndexOf('/')) + '/' 
        : '';
    
    // Override image renderer to handle paths correctly
    const defaultImageRenderer = md.renderer.rules.image;
    md.renderer.rules.image = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const srcIndex = token.attrIndex('src');
        if (srcIndex >= 0) {
            const src = token.attrs[srcIndex][1];
            // Only prepend path if it's a relative path without / at the beginning
            if (!src.startsWith('/') && !src.startsWith('http')) {
                // For images in subfolders, ensure correct path with basePath
                token.attrs[srcIndex][1] = `${basePath}blogs/${dirPath}${src}`;
            }
        }
        return defaultImageRenderer(tokens, idx, options, env, self);
    };
    
    // Custom renderer for code blocks to ensure proper overflow handling
    md.renderer.rules.code_block = function(tokens, idx, options, env) {
        const token = tokens[idx];
        return `<pre style="overflow-x: auto !important; white-space: pre !important; word-wrap: normal !important; max-width: 100% !important;"><code style="white-space: pre !important; word-wrap: normal !important;">${md.utils.escapeHtml(token.content)}</code></pre>`;
    };
    
    md.renderer.rules.fence = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';
        const langName = info ? info.split(/\s+/g)[0] : '';
        
        return `<pre style="overflow-x: auto !important; white-space: pre !important; word-wrap: normal !important; max-width: 100% !important;"><code${langName ? ` class="${options.langPrefix}${langName}"` : ''} style="white-space: pre !important; word-wrap: normal !important;">${md.utils.escapeHtml(token.content)}</code></pre>`;
    };
    
    return md.render(markdown);
}