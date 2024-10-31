// src/utils/constants.js
module.exports = {
    // HTTP Status codes
    STATUS_CODES: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER: 500
    },

    // User roles
    ROLES: {
        ADMIN: 'admin',
        ANIMATION: 'animation',
        PARENT: 'parent'
    },

    // JWT constants
    JWT: {
        EXPIRES_IN: '7d',
        ALGORITHM: 'HS256'
    },

    // Upload limits
    UPLOAD: {
        MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
        ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'application/pdf']
    },

    // Cache durations
    CACHE: {
        SHORT: 60 * 5, // 5 minutes
        MEDIUM: 60 * 60, // 1 hour
        LONG: 60 * 60 * 24 // 24 hours
    }
};

