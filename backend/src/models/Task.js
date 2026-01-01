const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Todo', 'In Progress', 'Completed'),
        defaultValue: 'Todo',
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    // We'll define the foreign key relationship in index.js or let Sequelize handle it
});

module.exports = Task;
