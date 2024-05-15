// Object to cache the loaded language data
let languages = {};
const html = document.documentElement; // Define HTML element for setting language direction

function switchLanguage(lang) {
    currentLang = lang; // Set the current language
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');

    // Check if the language data is already loaded
    if (languages[lang]) {
        applyTranslations(languages[lang]);
    } else {
        // Load language file if not already loaded
        fetch(`./${lang}.json`)
            .then(response => response.json())
            .then(data => {
                languages[lang] = data; // Cache the loaded language data
                applyTranslations(data); // Apply the translations
            })
            .catch(error => {
                console.error('Error loading the language file:', error);
                showLanguageLoadError(lang); 
            });
    }
}

function applyTranslations(data) {
    document.getElementById('title').textContent = data.title;
    document.getElementById('heading').textContent = data.heading;
    document.getElementById('subheading').textContent = data.subheading;
    document.getElementById('description').textContent = data.description;
    document.getElementById('more-info-btn').textContent = data.more;
    document.getElementById('contact-link').innerHTML = sanitize(data.contact); // Sanitize if data may include HTML
}

function sanitize(html) {
    // A simple sanitation function (extend as needed)
    return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function showLanguageLoadError(lang) {
    // Display or log language load error
    console.error(`Failed to load the language file for ${lang}.`);
}

// Initialize with default language
switchLanguage('en');

// Version update
document.addEventListener('DOMContentLoaded', function() {
    /** version will automatically be updated on each push by ./.github/workflows/increment-versio.yml */
    document.getElementById('version-display').textContent = 'Version 1.0.119';
});
