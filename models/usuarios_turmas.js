const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize');

const UsuariosTurmas = sequelize.define(
    "usuarios_turmas", {
    Usuarios_idUsuarios: {
        type: Sequelize.INTEGER,
        primaryKey: false, // Define essa coluna como a chave primaria
    },

    Turmas_idTurmas: {
        type: Sequelize.INTEGER,
        primaryKey: false, // Define essa coluna como a chave primaria
    }
},
    {
        // Precisa disso pq não tem as colunas createdAt e uploadAt no bd
        timestamps: false // Adiciona colunas createdAt e uploadAt automaticamente 
    });

    UsuariosTurmas.removeAttribute('id')
    
module.exports = UsuariosTurmas;