// Object to cache the loaded language data
let languages = {};

function switchLanguage(lang) {
    currentLang = lang; // Set the current language
    
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
            .catch(error => console.error('Error loading the language file:', error));
    }
}

function applyTranslations(data) {
    document.getElementById('title').textContent = data.title;
    document.getElementById('heading').textContent = data.heading;
    document.getElementById('description').textContent = data.description;
    document.getElementById('contact').innerHTML = `<a href="mailto:${data.email}">${data.contact}</a>`;
}

// Initialize with default language
switchLanguage('en');
