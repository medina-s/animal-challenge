const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:7e25e8f853ec49268d88b860388fd0dc@localhost:5432/animal-server");

module.exports = db;