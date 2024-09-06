require('dotenv').config(); // Загружает переменные из .env файла

const { Client } = require("pg");

// Использует переменную окружения DATABASE_URL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

(async () => {
    await client.connect();
    try {
        // Команда для чтения данных из таблицы
        const selectQuery = `
            SELECT * FROM jargon;
        `;

        // Выполнение запроса на чтение данных
        const result = await client.query(selectQuery);
        console.log('Data from table:', result.rows);
    } catch (err) {
        console.error("Error executing query:", err);
    } finally {
        await client.end();
    }
})();
