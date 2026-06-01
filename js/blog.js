// Global variable to store all posts
let allPosts = [];
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
            displayBlogList(allPosts, currentSortOrder);
            
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
            const blogSection = document.getElementById('blog');
            appendErrorNotice(blogSection, `Error loading blog posts: ${error.message}`);
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
            displayBlogList(allPosts, currentSortOrder);
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
    if (!blogSection) {
        return;
    }

    // Remove existing blog groups and entries but keep title and controls
    const existingGroups = blogSection.querySelectorAll('.blog-group');
    existingGroups.forEach(group => group.remove());
    const existingEntries = blogSection.querySelectorAll('.blog-entry');
    existingEntries.forEach(entry => entry.remove());

    // Remove the loading spinner if it exists
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }

    const groupedPosts = groupPostsByCategory(posts);
    const orderedCategories = getOrderedCategories(Object.keys(groupedPosts));

    orderedCategories.forEach(category => {
        const postsInCategory = groupedPosts[category] || [];
        if (!postsInCategory.length) {
            return;
        }

        const group = document.createElement('details');
        group.className = 'blog-group';
        group.open = false;

        const summary = document.createElement('summary');
        summary.className = 'blog-group-summary';

        const title = document.createElement('span');
        title.className = 'blog-group-title';
        title.textContent = getCategoryLabel(category);

        const count = document.createElement('span');
        count.className = 'blog-group-count';

        const countLabel = document.createElement('span');
        countLabel.className = 'blog-group-count-label';
        countLabel.textContent = 'Amount of blogs';

        const countValue = document.createElement('span');
        countValue.className = 'blog-group-count-value';
        countValue.textContent = `${postsInCategory.length}`;

        count.appendChild(countLabel);
        count.appendChild(countValue);

        summary.appendChild(title);
        summary.appendChild(count);
        group.appendChild(summary);

        const list = document.createElement('div');
        list.className = 'blog-group-list';

        const sortedPosts = sortPosts(postsInCategory, sortOrder);
        sortedPosts.forEach(post => {
            const entryBox = document.createElement('div');
            entryBox.className = `entry-box blog-entry${post.pinned ? ' pinned-post' : ''}`;
            if (post.pinned) {
                const pinnedBadge = document.createElement('div');
                pinnedBadge.className = 'pinned-badge';
                pinnedBadge.textContent = '\uD83D\uDCCC Pinned';
                entryBox.appendChild(pinnedBadge);
            }

            const entryDate = document.createElement('span');
            entryDate.className = 'entry-date';
            entryDate.textContent = formatDate(post.date);
            entryBox.appendChild(entryDate);

            const titleHeading = document.createElement('h3');
            const titleLink = document.createElement('a');
            titleLink.className = 'blog-title';
            titleLink.href = `?post=${encodeURIComponent(post.id || '')}`;
            titleLink.textContent = post.title || '';
            titleHeading.appendChild(titleLink);
            entryBox.appendChild(titleHeading);

            const excerpt = document.createElement('p');
            excerpt.textContent = post.excerpt || '';
            entryBox.appendChild(excerpt);

            const links = document.createElement('div');
            links.className = 'blog-links';

            const readMore = document.createElement('a');
            readMore.className = 'read-more';
            readMore.href = `?post=${encodeURIComponent(post.id || '')}`;
            readMore.textContent = 'Read more';
            links.appendChild(readMore);

            const githubUrl = safeExternalUrl(post.githubUrl);
            if (githubUrl) {
                const githubLink = document.createElement('a');
                githubLink.href = githubUrl;
                githubLink.target = '_blank';
                githubLink.rel = 'noopener noreferrer';
                githubLink.className = 'github-link';
                githubLink.textContent = 'View on GitHub';
                links.appendChild(githubLink);
            }

            entryBox.appendChild(links);
            list.appendChild(entryBox);
        });

        group.appendChild(list);
        blogSection.appendChild(group);
    });
}

function groupPostsByCategory(posts) {
    return posts.reduce((groups, post) => {
        const category = post.category || 'random';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(post);
        return groups;
    }, {});
}

function getOrderedCategories(categories) {
    const order = [
        'pentesting',
        'network',
        'application-hacking',
        'server-management',
        'random'
    ];

    const ordered = order.filter(category => categories.includes(category));
    const extras = categories
        .filter(category => !order.includes(category))
        .sort();

    return [...ordered, ...extras];
}

function getCategoryLabel(category) {
    const labels = {
        'pentesting': 'Pentesting course',
        'network': 'Network attacks and reconnaissance',
        'application-hacking': 'Application hacking',
        'server-management': 'Server management',
        'random': 'Random'
    };

    if (labels[category]) {
        return labels[category];
    }

    return category
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
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
            blogSection.replaceChildren();
            
            // Add back button
            const backLink = document.createElement('a');
            backLink.href = '.';  // Change from 'blog.html' to '.'
            backLink.className = 'back-link';
            backLink.textContent = '\u2190 Back to all posts';
            blogSection.appendChild(backLink);
            
            // Create post container
            const postContainer = document.createElement('div');
            postContainer.className = 'blog-post';
            
            // Add post header
            const postHeader = document.createElement('div');
            postHeader.className = 'blog-post-header';
            const postTitle = document.createElement('h1');
            postTitle.textContent = post.title || '';
            postHeader.appendChild(postTitle);

            const postDate = document.createElement('span');
            postDate.className = 'entry-date';
            postDate.textContent = formatDate(post.date);
            postHeader.appendChild(postDate);

            const postGithubUrl = safeExternalUrl(post.githubUrl);
            if (postGithubUrl) {
                const postGithubLink = document.createElement('a');
                postGithubLink.href = postGithubUrl;
                postGithubLink.target = '_blank';
                postGithubLink.rel = 'noopener noreferrer';
                postGithubLink.className = 'github-link';
                postGithubLink.textContent = 'View on GitHub';
                postHeader.appendChild(postGithubLink);
            }
            
            // Add post content with file path and basePath for correct image handling
            const postContent = document.createElement('div');
            postContent.className = 'blog-post-content';
            
            // Pass basePath to the markdown renderer
            const contentFragment = renderMarkdownToFragment(markdown, post.file, basePath);
            postContent.appendChild(contentFragment);
            
            // Append everything to the container
            postContainer.appendChild(postHeader);
            postContainer.appendChild(postContent);
            blogSection.appendChild(postContainer);
            
            // Update page title
            document.title = `${post.title} - Matti Pohjanoksa's Blog`;
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            appendErrorNotice(blogSection, `Error loading blog post: ${error.message}. Please try again later.`);
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
    if (filePath.startsWith('Application-Hacking')) {
        return { ...post, category: 'application-hacking' };
    }
    if (filePath.startsWith('Server management')) {
        return { ...post, category: 'server-management' };
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
    if (lower.includes('application')) {
        return 'application-hacking';
    }
    if (lower.includes('server')) {
        return 'server-management';
    }
    if (lower === 'random') {
        return 'random';
    }
    return lower;
}

function appendErrorNotice(container, message) {
    if (!container) {
        return;
    }
    const errorText = document.createElement('p');
    errorText.textContent = message;
    container.appendChild(errorText);
}

function safeExternalUrl(url) {
    if (!url || typeof url !== 'string') {
        return '';
    }
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' ? parsed.href : '';
    } catch (error) {
        return '';
    }
}

function isSafeUrl(url, allowRelative = false) {
    if (!url || typeof url !== 'string') {
        return false;
    }
    const trimmed = url.trim();
    if (allowRelative) {
        if (trimmed.startsWith('/') || trimmed.startsWith('./') || trimmed.startsWith('../') || trimmed.startsWith('#') || trimmed.startsWith('?')) {
            return true;
        }

        // Allow plain relative paths like "image.png" or "images/photo.jpg".
        const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed);
        if (!hasScheme && !trimmed.startsWith('//')) {
            return true;
        }
    }
    if (/^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)) {
        return true;
    }
    try {
        const parsed = new URL(trimmed);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (error) {
        return false;
    }
}

function isExternalUrl(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }
    try {
        const parsed = new URL(url, window.location.origin);
        return parsed.origin !== window.location.origin;
    } catch (error) {
        return false;
    }
}

function sanitizeRenderedContent(fragment) {
    fragment.querySelectorAll('script, iframe, object, embed, link, meta, style').forEach(node => node.remove());

    fragment.querySelectorAll('*').forEach(node => {
        Array.from(node.attributes).forEach(attribute => {
            if (attribute.name.toLowerCase().startsWith('on')) {
                node.removeAttribute(attribute.name);
            }
        });
    });

    fragment.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!isSafeUrl(href, true)) {
            link.removeAttribute('href');
            return;
        }
        if (isExternalUrl(href)) {
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
        }
    });

    fragment.querySelectorAll('img').forEach(image => {
        const src = image.getAttribute('src');
        if (!isSafeUrl(src, true)) {
            image.removeAttribute('src');
        }
        image.setAttribute('loading', 'lazy');
    });
}

function renderMarkdownToFragment(markdown, filePath = '', basePath = '') {
    const md = window.markdownit({
        html: false,
        breaks: true,
        linkify: true,
        typographer: true
    });
    md.validateLink = function(url) {
        return isSafeUrl(url, true);
    };

    // Get the directory path from the filePath
    const dirPath = filePath.includes('/') 
        ? filePath.substring(0, filePath.lastIndexOf('/')) + '/' 
        : '';

    // Override image renderer to handle paths correctly
    const defaultImageRenderer = md.renderer.rules.image || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    md.renderer.rules.image = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const srcIndex = token.attrIndex('src');
        if (srcIndex >= 0) {
            const src = token.attrs[srcIndex][1] || '';
            let normalizedSrc = src;
            // Only prepend path if it's a relative path without / at the beginning
            if (!src.startsWith('/') && !src.startsWith('http')) {
                // For images in subfolders, ensure correct path with basePath
                normalizedSrc = `${basePath}blogs/${dirPath}${src}`;
                token.attrs[srcIndex][1] = normalizedSrc;
            }
            if (!isSafeUrl(normalizedSrc, true)) {
                token.attrs[srcIndex][1] = '';
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

    const template = document.createElement('template');
    template.innerHTML = md.render(markdown);
    sanitizeRenderedContent(template.content);
    return template.content;
}