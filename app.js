// ========================================
// Ton's Book Notes - JavaScript Application
// ========================================

// Initialize App
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    // Load recent books on home page
    loadRecentBooks();

    // Load all books on books page
    loadAllBooks();

    // Setup navigation
    setupNavigation();

    // Check for hash in URL
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
}

// ========================================
// Navigation Functions
// ========================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateToPage(page);
        });
    });
}

function navigateToPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });

    // Update URL hash
    window.location.hash = pageId;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHashChange() {
    const hash = window.location.hash.replace('#', '');

    if (hash.startsWith('book-')) {
        // Show book detail
        const bookId = hash.replace('book-', '');
        showBookDetail(bookId);
    } else if (hash && document.getElementById(hash)) {
        navigateToPage(hash);
    } else {
        navigateToPage('home');
    }
}

// ========================================
// Book Loading Functions
// ========================================

function loadRecentBooks() {
    const container = document.getElementById('recent-books');
    if (!container) return;

    // Get the 3 most recent books
    const recentBooks = booksData.slice(0, 3);

    container.innerHTML = recentBooks.map(book => createBookCard(book)).join('');

    // Add click handlers
    addBookCardListeners();
}

function loadAllBooks() {
    const container = document.getElementById('all-books');
    if (!container) return;

    container.innerHTML = booksData.map(book => createBookCard(book)).join('');

    // Add click handlers
    addBookCardListeners();
}

function createBookCard(book) {
    const tags = book.tags.map(tag => `<span class="book-tag">${tag}</span>`).join('');

    return `
        <article class="book-card" data-book-id="${book.id}">
            <img src="${book.cover}" alt="${book.title}" class="book-card-cover">
            <div class="book-card-content">
                <h3 class="book-card-title">${book.title}</h3>
                <p class="book-card-subtitle">${book.subtitle || ''}</p>
                <div class="book-card-tags">
                    ${tags}
                </div>
            </div>
        </article>
    `;
}

function addBookCardListeners() {
    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', function () {
            const bookId = this.dataset.bookId;
            window.location.hash = `book-${bookId}`;
        });
    });
}

// ========================================
// Book Detail Functions
// ========================================

function showBookDetail(bookId) {
    const book = booksData.find(b => b.id === bookId);

    if (!book) {
        navigateToPage('home');
        return;
    }

    const container = document.getElementById('book-detail-content');
    if (!container) return;

    // Generate book detail HTML
    container.innerHTML = generateBookDetailHTML(book);

    // Show book detail page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('book-detail').classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add back button listener
    document.querySelector('.back-btn')?.addEventListener('click', function () {
        window.location.hash = 'books';
    });
}

function generateBookDetailHTML(book) {
    const tags = book.tags.map(tag => `<span class="meta-item">🏷️ ${tag}</span>`).join('');

    // Generate sections HTML
    let sectionsHTML = '';

    if (book.sections && book.sections.length > 0) {
        sectionsHTML = book.sections.map(section => {
            if (section.type === 'list') {
                const items = section.items.map(item => {
                    if (typeof item === 'object') {
                        return `<li><strong>${item.title}</strong>${item.content}</li>`;
                    }
                    return `<li>${item}</li>`;
                }).join('');

                return `
                    <div class="book-section">
                        <h3 class="book-section-title">${section.title}</h3>
                        <ul>${items}</ul>
                    </div>
                `;
            } else if (section.type === 'table') {
                const headers = section.headers.map(h => `<th>${h}</th>`).join('');
                const rows = section.rows.map(row => {
                    const cells = row.map(cell => `<td>${cell}</td>`).join('');
                    return `<tr>${cells}</tr>`;
                }).join('');

                return `
                    <div class="book-section">
                        <h3 class="book-section-title">${section.title}</h3>
                        <table class="info-table">
                            <thead><tr>${headers}</tr></thead>
                            <tbody>${rows}</tbody>
                        </table>
                    </div>
                `;
            } else if (section.type === 'highlight') {
                return `
                    <div class="highlight-box">
                        <h4 class="highlight-box-title">${section.title}</h4>
                        <p>${section.content}</p>
                    </div>
                `;
            } else if (section.type === 'numbered-list') {
                const items = section.items.map((item, index) => {
                    return `<li><strong>${index + 1}. ${item.title}</strong> ${item.description || ''}</li>`;
                }).join('');

                return `
                    <div class="book-section">
                        <h3 class="book-section-title">${section.title}</h3>
                        <ul>${items}</ul>
                    </div>
                `;
            } else if (section.type === 'infographic') {
                return `
                    <div class="infographic-container">
                        <img src="${section.image}" alt="Infographic" class="infographic-image">
                        <p class="infographic-caption">${section.caption || '📊 สรุปเนื้อหาสำคัญ'}</p>
                    </div>
                `;
            } else if (section.type === 'section-header') {
                return `
                    <div class="section-divider">
                        <h2 class="major-section-title">${section.title}</h2>
                        ${section.subtitle ? `<p class="major-section-subtitle">${section.subtitle}</p>` : ''}
                    </div>
                `;
            } else if (section.type === 'metaphor') {
                return `
                    <div class="metaphor-box">
                        <h4 class="metaphor-title">${section.title}</h4>
                        <p>${section.content}</p>
                    </div>
                `;
            }
            return '';
        }).join('');
    }

    // Infographic section
    let infographicHTML = '';
    if (book.infographic) {
        infographicHTML = `
            <div class="infographic-container">
                <img src="${book.infographic}" alt="Infographic" class="infographic-image">
                <p class="infographic-caption">📊 ${book.infographicCaption || 'สรุปเนื้อหาสำคัญ'}</p>
            </div>
        `;
    }

    return `
        <button class="back-btn">
            ← กลับไปหน้ารายการหนังสือ
        </button>
        
        <div class="book-detail-header">
            <div class="book-cover-container">
                <img src="${book.cover}" alt="${book.title}" class="book-cover-large">
            </div>
            <div class="book-info">
                <h2 class="book-title-large">${book.title}</h2>
                ${book.subtitle ? `<p class="book-subtitle">${book.subtitle}</p>` : ''}
                <div class="book-meta">
                    ${book.authors ? `<span class="meta-item">✍️ ${book.authors}</span>` : ''}
                    ${book.publisher ? `<span class="meta-item">📚 ${book.publisher}</span>` : ''}
                    ${tags}
                </div>
            </div>
        </div>
        
        ${sectionsHTML}
        
        ${infographicHTML}
    `;
}

// ========================================
// Utility Functions
// ========================================

// Scroll to top button functionality
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Image lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => observer.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Console welcome message
console.log(`
📚 Ton's Book Notes
━━━━━━━━━━━━━━━━━━━━━━
Welcome to the book notes!
Made with 💖 by Ton
`);
