// src/config/database.js
const { Pool } = require('pg');
const logger = require('./logger');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test the connection
pool.on('connect', () => {
    logger.info('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    logger.error('PostgreSQL pool error:', err);
});

module.exports = {
    /**
     * Execute a query with parameters
     * @param {string} text - The SQL query text
     * @param {Array} params - The query parameters
     */
    query: async (text, params) => {
        const start = Date.now();
        try {
            const res = await pool.query(text, params);
            const duration = Date.now() - start;
            logger.debug('Executed query', { text, duration, rows: res.rowCount });
            return res;
        } catch (error) {
            logger.error('Database query error:', { text, error });
            throw error;
        }
    },

    /**
     * Get a client from the pool for transactions
     */
    getClient: async () => {
        const client = await pool.connect();
        const query = client.query;
        const release = client.release;

        // Set a timeout of 5 seconds on idle clients
        const timeout = setTimeout(() => {
            logger.error('A client has been checked out for too long.');
            logger.error(`The last executed query on this client was: ${client.lastQuery}`);
        }, 5000);

        // Monkey patch the query method to keep track of the last query executed
        client.query = (...args) => {
            client.lastQuery = args;
            return query.apply(client, args);
        };

        client.release = () => {
            clearTimeout(timeout);
            client.query = query;
            client.release = release;
            return release.apply(client);
        };

        return client;
    }
};

