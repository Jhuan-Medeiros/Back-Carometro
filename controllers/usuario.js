const { where } = require("sequelize");
const Usuario = require("../models/usuario");
const UsuariosTurma = require('../models/usuarios_turmas')


exports.getAll = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios)
};

exports.getById = async (req, res) => {
    const idDoParam = req.params.id;
    const usuarioEncontrado = await Usuario.findOne({ idUsuarios : idDoParam });
    res.json(usuarioEncontrado)
}

exports.createUsuario = async (req, res) => {
    const usuarioCadastrado = await Usuario.findOne({ where: { cpf : req.body.cpf } });

    if(usuarioCadastrado) {
        return res.send("Já existe um usuário cadastrado neste CPF")
    }
 
    const usuarioCriado = await Usuario.create(req.body)

    if(usuarioCriado.idUsuarios && req.body.Turmas_idTurmas){
        await UsuariosTurma.create({
            Turmas_idTurmas: req.body.Turmas_idTurmas,
            Usuarios_idUsuarios: usuarioCriado.idUsuarios,
        })
    } else {
        return res.send("Usuário cadastrado sem turma")
    }

    console.log("usuarioCriado", usuarioCriado)
    return res.send("Usuário enviado")
};

exports.deleteUsuario = async(req, res) => {
    try{
        const {id} = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).send("Usuário não encontrado");
        }

        const desvincular = await UsuariosTurma.findOne({where:{Usuarios_idUsuarios: usuario.idUsuarios}});
        if (desvincular) {
            await desvincular.destroy();
        }
        await usuario.destroy();

        return res.send("Usuário deletado com sucesso");
    } catch (error) {
        console.error("Erro ao deletar o usuário:", error);
        return res.status(500).send("Erro ao deletar usuário")
    }
}


exports.updateUsuario = async (req, res) => {
    const codigoUsuario = req.body.cpf;
    try {
        const usuarioCadastrado = await Usuario.findOne({ where: { cpf : req.body.cpf } });
        if (usuarioCadastrado) {
            //está aqui para não atrapalhar o fluxo do código, deletando o código(nome da turma) antes de ser feita qualquer alteração 
            delete req.body.codigo;
            const [numRowsUpdated] = await Usuario.update(req.body,{ where: { cpf : req.body.cpf } });

            //ele só vai se for maior que zero não vai
            if (numRowsUpdated > 0) {
                const usuarioAtualizado = await Usuario.findOne({ where: { cpf : req.body.cpf } });// para não ter outro igual
                //se não vai aparecer essa mensagem
                return res.send({ message: 'Usuário atualizado com sucesso!', usuariocomdadosnovos: usuarioAtualizado });
            }
            else {
                return res.send('Usuário encontrado, porem sem novos dados para atualizar!')
            }
        }
        else {
            return res.status(404).send('Não existe um usuário cadastrado com esse código!');
        }
    }//tenta conferir o código
    catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).send('Ocorreu um erro ao atualizar a usuário.')
    }//se não der pega o error 
}