const locales = require('../locales');

class I18n {
    constructor() {
        this.defaultLocale = 'fr';
        this.currentLocale = this.defaultLocale;
    }

    setLocale(locale) {
        if (locales[locale]) {
            this.currentLocale = locale;
        }
    }

    translate(key, replacements = {}) {
        let translation = locales[this.currentLocale][key] || locales[this.defaultLocale][key] || key;

        // Handle replacements
        Object.keys(replacements).forEach(key => {
            translation = translation.replace(new RegExp(`{${key}}`, 'g'), replacements[key]);
        });

        return translation;
    }

    getCurrentLocale() {
        return this.currentLocale;
    }
}

// Export a singleton instance
module.exports = new I18n();