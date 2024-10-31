// src/utils/helpers.js
const crypto = require('crypto');

module.exports = {
    /**
     * Generate a random string of specified length
     * @param {number} length - Length of the string to generate
     * @returns {string} Random string
     */
    generateRandomString: (length = 32) => {
        return crypto.randomBytes(length).toString('hex');
    },

    /**
     * Format error response
     * @param {string} message - Error message
     * @param {*} details - Additional error details
     * @returns {Object} Formatted error object
     */
    formatError: (message, details = null) => {
        return {
            success: false,
            message,
            details: details || undefined
        };
    },

    /**
     * Format success response
     * @param {*} data - Response data
     * @param {string} message - Success message
     * @returns {Object} Formatted success object
     */
    formatSuccess: (data = null, message = 'Operation successful') => {
        return {
            success: true,
            message,
            data: data || undefined
        };
    },

    /**
     * Check if string is valid JSON
     * @param {string} str - String to check
     * @returns {boolean} True if valid JSON
     */
    isValidJSON: (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
};