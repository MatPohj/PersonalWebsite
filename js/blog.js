console.log("Why are you looking at my console?");

/*
 * Blog + course list.
 * Loaded on the home page (course summary) and on /blog/ (course sections and
 * single post view). All posts come from blogs/metadata.json, so adding a post
 * only means adding a markdown file and one metadata entry.
 */

// Known courses: label and (optional) course repository.
// The order on the page is decided by the newest post in each course.
const COURSES = {
    'server-management': {
        label: 'Server Management',
        repo: ''
    },
    'application-hacking': {
        label: 'Application Hacking',
        repo: 'https://github.com/MatPohj/Application-Hacking'
    },
    'network': {
        label: 'Network Attacks and Reconnaissance',
        repo: 'https://github.com/MatPohj/Network-Attacks-and-Reconnaissance-Autumn-25'
    },
    'pentesting': {
        label: 'Penetration Testing',
        repo: 'https://github.com/MatPohj/PenetrationTesting25S'
    },
    'random': {
        label: 'General',
        repo: ''
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const blogRoot = document.getElementById('blog');
    const courseList = document.getElementById('course-list');
    if (!blogRoot && !courseList) {
        return;
    }

    const basePath = getBasePath();

    fetch(`${basePath}blogs/metadata.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(rawPosts => {
            const posts = rawPosts.map(addCategoryToPost);

            if (courseList) {
                renderCourseSummary(posts, courseList);
            }

            if (blogRoot) {
                const postId = new URLSearchParams(window.location.search).get('post');
                const post = postId ? posts.find(p => p.id === postId) : null;
                if (post) {
                    loadBlogPost(post, basePath, blogRoot);
                } else {
                    renderBlogIndex(posts, blogRoot);
                    if (postId) {
                        const note = el('p', 'blog-status', `Post "${postId}" was not found. Here is everything I have written so far.`);
                        blogRoot.prepend(note);
                    }
                    scrollToHash();
                }
            }
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            const target = blogRoot || courseList;
            target.replaceChildren(el('p', 'blog-status', `Error loading blog posts: ${error.message}`));
        });
});

/* ---------- Helpers ---------- */

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) {
        node.className = className;
    }
    if (text !== undefined && text !== null) {
        node.textContent = text;
    }
    return node;
}

function getBasePath() {
    const path = window.location.pathname;
    return (path.includes('/blog/') || path.endsWith('/blog')) ? '../' : './';
}

function scrollToHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) {
        return;
    }
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView();
    }
}

function pad2(n) {
    return n < 10 ? `0${n}` : `${n}`;
}

function postUrl(post) {
    return `?post=${encodeURIComponent(post.id || '')}`;
}

// "h4 Pizza Fantasia" -> week 4, "Pizza Fantasia"
// "Penetration testing h7, Maalisuoralla" -> week 7, "Maalisuoralla"
function parseTitle(title) {
    const raw = (title || '').trim();
    const match = /^(?:penetration testing\s+)?h(\d+)\s*[:,]?\s*(.+)$/i.exec(raw);
    if (!match) {
        return { week: null, name: raw };
    }
    const name = match[2].charAt(0).toUpperCase() + match[2].slice(1);
    return { week: Number(match[1]), name };
}

function newestFirst(a, b) {
    return new Date(b.date) - new Date(a.date);
}

function getCourse(category) {
    if (COURSES[category]) {
        return COURSES[category];
    }
    const label = category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    return { label, repo: '' };
}

// Groups non-pinned posts by category, newest course first.
function groupCourses(posts) {
    const groups = {};
    posts.filter(post => !post.pinned).forEach(post => {
        (groups[post.category] = groups[post.category] || []).push(post);
    });

    return Object.keys(groups)
        .map(category => {
            const items = groups[category].sort(newestFirst);
            const oldest = items[items.length - 1];
            return {
                category,
                course: getCourse(category),
                posts: items,
                latest: items[0],
                from: oldest.date,
                to: items[0].date
            };
        })
        .sort((a, b) => new Date(b.to) - new Date(a.to));
}

function plural(n, word) {
    return `${n} ${word}${n === 1 ? '' : 's'}`;
}

function year(dateString) {
    return String(new Date(dateString).getFullYear());
}

/* ---------- Home page: course summary ---------- */

function renderCourseSummary(posts, container) {
    const courses = groupCourses(posts);
    const rows = courses.map(group => {
        const row = el('a', 'course-row');
        row.href = `blog/#course-${group.category}`;

        row.appendChild(el('span', 'course-count', plural(group.posts.length, 'post')));

        const main = el('div', 'course-main');
        main.appendChild(el('div', 'course-name', group.course.label));
        main.appendChild(el('div', 'course-latest', `Latest: ${parseTitle(group.latest.title).name}`));
        row.appendChild(main);

        row.appendChild(el('span', 'course-range', `${group.from} → ${group.to}`));
        return row;
    });
    container.replaceChildren(...rows);

    const count = document.getElementById('writing-count');
    if (count) {
        count.textContent = `(${posts.length})`;
    }
}

/* ---------- Blog page: index ---------- */

function renderBlogIndex(posts, root) {
    const head = document.getElementById('blog-head');
    if (head) {
        head.hidden = false;
    }
    document.title = 'Writing - Matti Pohjanoksa';

    const frag = document.createDocumentFragment();

    // Pinned posts
    posts.filter(post => post.pinned).sort(newestFirst).forEach(post => {
        const link = el('a', 'pinned');
        link.href = postUrl(post);
        link.appendChild(el('span', 'pinned-label', 'Pinned'));
        link.appendChild(el('span', 'pinned-title', post.title || ''));
        link.appendChild(el('span', 'pinned-date', post.date));
        frag.appendChild(link);
    });

    const courses = groupCourses(posts);

    // Jump grid
    const grid = el('nav', 'jump-grid');
    grid.setAttribute('aria-label', 'Courses');
    courses.forEach((group, index) => {
        const card = el('a', 'jump-card');
        card.href = `#course-${group.category}`;
        card.appendChild(el('span', 'jump-num', pad2(index + 1)));
        card.appendChild(el('span', 'jump-name', group.course.label));
        card.appendChild(el('span', 'jump-meta', `${plural(group.posts.length, 'post')} · ${year(group.to)}`));
        grid.appendChild(card);
    });
    frag.appendChild(grid);

    // Course sections
    courses.forEach((group, index) => {
        const section = el('section', 'course');
        section.id = `course-${group.category}`;
        section.setAttribute('aria-labelledby', `course-title-${group.category}`);

        const side = el('div', 'course-side');
        side.appendChild(el('span', 'section-num', pad2(index + 1)));
        const heading = el('h2', '', group.course.label);
        heading.id = `course-title-${group.category}`;
        side.appendChild(heading);

        const facts = el('div', 'course-facts');
        facts.appendChild(document.createTextNode(plural(group.posts.length, 'post')));
        facts.appendChild(document.createElement('br'));
        facts.appendChild(document.createTextNode(`${group.from} → ${group.to}`));
        side.appendChild(facts);

        const repo = safeExternalUrl(group.course.repo);
        if (repo) {
            const repoLink = el('a', 'text-link', 'Course repo on GitHub ');
            repoLink.href = repo;
            repoLink.target = '_blank';
            repoLink.rel = 'noopener noreferrer';
            const arrow = el('span', '', '↗');
            arrow.setAttribute('aria-hidden', 'true');
            repoLink.appendChild(arrow);
            side.appendChild(repoLink);
        }
        section.appendChild(side);

        const list = el('ul', 'post-list');
        group.posts.forEach(post => {
            const item = el('li');
            const row = el('a', 'post-row');
            row.href = postUrl(post);

            const parsed = parseTitle(post.title);
            row.appendChild(el('span', 'post-week', parsed.week === null ? '—' : `H${parsed.week}`));
            row.appendChild(el('span', 'post-title', parsed.name));
            row.appendChild(el('span', 'post-date', post.date));

            item.appendChild(row);
            list.appendChild(item);
        });
        section.appendChild(list);

        frag.appendChild(section);
    });

    root.replaceChildren(frag);
}

/* ---------- Blog page: single post ---------- */

function loadBlogPost(post, basePath, root) {
    fetch(`${basePath}blogs/${post.file}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            const head = document.getElementById('blog-head');
            if (head) {
                head.hidden = true;
            }

            const parsed = parseTitle(post.title);
            const course = getCourse(post.category);

            const back = el('a', 'back-link', '← All writing');
            back.href = '.';

            const article = el('article', 'blog-post');

            const header = el('header', 'post-header');
            const eyebrowText = parsed.week === null
                ? course.label
                : `${course.label} · H${parsed.week}`;
            header.appendChild(el('div', 'eyebrow', post.pinned ? 'Pinned' : eyebrowText));
            header.appendChild(el('h1', '', parsed.name));

            const meta = el('div', 'post-meta');
            const time = el('time', '', formatDate(post.date));
            time.dateTime = post.date;
            meta.appendChild(time);

            const githubUrl = safeExternalUrl(post.githubUrl);
            if (githubUrl) {
                const githubLink = el('a', 'text-link', 'View source on GitHub ');
                githubLink.href = githubUrl;
                githubLink.target = '_blank';
                githubLink.rel = 'noopener noreferrer';
                const arrow = el('span', '', '↗');
                arrow.setAttribute('aria-hidden', 'true');
                githubLink.appendChild(arrow);
                meta.appendChild(githubLink);
            }
            header.appendChild(meta);

            const content = el('div', 'post-content');
            const rendered = renderMarkdownToFragment(markdown, post.file, basePath);

            // Many posts start with their own title heading; the page header
            // already shows it, so drop the duplicate.
            const firstHeading = rendered.firstElementChild;
            if (firstHeading && /^H[1-3]$/.test(firstHeading.tagName)) {
                const text = firstHeading.textContent.toLowerCase();
                if (text.includes(parsed.name.toLowerCase())) {
                    firstHeading.remove();
                }
            }
            content.appendChild(rendered);

            article.appendChild(header);
            article.appendChild(content);

            root.replaceChildren(back, article);
            document.title = `${parsed.name} - Matti Pohjanoksa`;
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            const back = el('a', 'back-link', '← All writing');
            back.href = '.';
            root.replaceChildren(back, el('p', 'blog-status', `Error loading blog post: ${error.message}. Please try again later.`));
        });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/* ---------- Categories ---------- */

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

/* ---------- URL safety ---------- */

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

/* ---------- Markdown rendering ---------- */

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
    md.validateLink = function (url) {
        return isSafeUrl(url, true);
    };

    // Directory of the post, so relative image paths resolve correctly
    const dirPath = filePath.includes('/')
        ? filePath.substring(0, filePath.lastIndexOf('/')) + '/'
        : '';

    const defaultImageRenderer = md.renderer.rules.image || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        const srcIndex = token.attrIndex('src');
        if (srcIndex >= 0) {
            const src = token.attrs[srcIndex][1] || '';
            let normalizedSrc = src;
            if (!src.startsWith('/') && !src.startsWith('http')) {
                normalizedSrc = `${basePath}blogs/${dirPath}${src}`;
                token.attrs[srcIndex][1] = normalizedSrc;
            }
            if (!isSafeUrl(normalizedSrc, true)) {
                token.attrs[srcIndex][1] = '';
            }
        }
        return defaultImageRenderer(tokens, idx, options, env, self);
    };

    // Code blocks use markdown-it's default renderers (escaped, no inline
    // styles). Scrolling and colors are handled in css/style.css.

    const template = document.createElement('template');
    template.innerHTML = md.render(markdown);
    sanitizeRenderedContent(template.content);
    return template.content;
}
