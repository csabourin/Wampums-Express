// public/js/app.js
// Update the app.js to handle initial configuration
import { initialConfig } from './utils/initial-config.js';

// Update meta tags and title based on language
function updateMetaTags(lang) {
    document.title = initialConfig.titles[lang];
    document.documentElement.lang = lang;
    
    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    
    ogTitle.content = initialConfig.titles[lang];
    ogUrl.content = window.location.origin;
    // ... other meta updates
}

// Initialize language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        document.querySelectorAll('.lang-btn').forEach(b => {
            b.classList.remove('active');
        });
        e.target.classList.add('active');
        updateMetaTags(lang);
        // Trigger language change in your app
        app.setLanguage(lang);
    });
});

// Add security headers in Express.js middleware
// src/middleware/security.js
const helmet = require('helmet');

module.exports = function setupSecurity(app) {
    app.use(helmet());
    
    app.use((req, res, next) => {
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://*.facebook.net https://*.clarity.ms https://*.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.bing.com https://*.clarity.ms https://*.cloudflareinsights.com; connect-src 'self' https://*.clarity.ms; worker-src 'self' blob:;");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("Referrer-Policy", "no-referrer");
        next();
    });
};