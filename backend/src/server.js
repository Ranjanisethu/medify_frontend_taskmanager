const app = require('./app');
const sequelize = require('./config/database');
const { models } = require('./models'); // Ensure models are loaded

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Sync models
        await sequelize.sync({ alter: true }); // Using alter: true to add dueDate column without losing data

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        console.log('\n\x1b[33m%s\x1b[0m', '---------------------------------------------------------');
        console.log('\x1b[33m%s\x1b[0m', 'IMPORTANT: Please ensure you have a standard PostgreSQL database running.');
        console.log('\x1b[33m%s\x1b[0m', 'Update the DATABASE_URL in backend/.env with your connection string.');
        console.log('\x1b[33m%s\x1b[0m', 'Example: postgres://user:password@hostname:5432/databasename');
        console.log('\x1b[33m%s\x1b[0m', 'If running locally, try changing "localhost" to "127.0.0.1".');
        console.log('\x1b[33m%s\x1b[0m', '---------------------------------------------------------');
    }
};

startServer();
