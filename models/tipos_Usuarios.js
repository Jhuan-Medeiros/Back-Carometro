const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const Tipos_Usuarios = sequelize.define("Tipos_Usuarios", {
    idTipos_Usuarios: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    descricao: Sequelize.STRING,

},
{
    timestamps: false
});

module.exports = Tipos_Usuarios;