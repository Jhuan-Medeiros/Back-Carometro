const { where } = require("sequelize");
const Turmas = require("../models/turmas");

exports.getAll = async (req, res) => {
    const turmas = await Turmas.findAll();
    res.json(turmas)
};

exports.getById = async (req, res) => {
    //no router id é o que vem depois do usuario/
    const idDoParam = req.params.id;
    const turmasEncontrado = await Turmas.findOne({ where: { idTurmas: idDoParam } });
    res.json(turmasEncontrado)
};

exports.createTurmas = async (req, res) => {
    const turmasCadastrado = await Turmas.findOne({ where: { codigo: req.body.codigo } });
    //verificação duplicidade de usuario cadastrado
    if (turmasCadastrado) {
        return res.send('Já existe um usuario cadastrado neste CPF.')
    }

    const turmasCriado = await Turmas.create(req.body)
    console.log("turmasCriado", turmasCriado)
    return res.send("Turma cadastradas com sucesso!")
    const turmaEncontrada = await Turmas.findOne({ idUsuarios: idDoParam });
    res.json(turmaEncontrada)
};

exports.createTurma = async (req, res) => {
    const turmaCadastrado = await Turmas.findOne({ where: { codigo: req.body.codigo } });
    //verificação duplicidade de usuario cadastrado
    if (turmaCadastrado) {
        return res.send('Já existe uma turma cadastrada neste código.')
    }
    //async:js fica rodando, espera pra chamar pra execultar
    const turmaCriada = await Turmas.create(req.body)
    console.log("turmaCriada", turmaCriada)
    return res.send("oi")

    // res.json(usuarios)
};

exports.updateTurma = async (req, res) => {
    const codigoTurma = req.params.editTurma;
    try {
        const turmaCadastrado = await Turmas.findOne({ where: { codigo: codigoTurma } });
        if (turmaCadastrado) {
            //está aqui para não atrapalhar o fluxo do cógigo, deletando o código(nome da turma) antes de ser feita qualquer alteração 
            delete req.body.codigo;
            const [numRowsUpdated] = await Turmas.update(req.body, {
                where: { codigo: codigoTurma }
            });

            //ele só vai se for maior que zero não vai
            if (numRowsUpdated > 0) {
                const turmaAtualizada = await Turmas.findOne({ where: { codigo: codigoTurma } });// para não ter outro igual
                //se não vai aparecer essa mensagem
                return res.send({ message: 'Turma atualizada com sucesso!', turmacomdadosnovos: turmaAtualizada });
            }
            else {
                return res.send('Turma encontrada, porem sem novos dados para atualizar!')
            }
        }
        else {
            return res.status(404).send('Não existe uma turma cadastrada com esse código!');
        }
    }//tenta conferir o código
    catch (error) {
        console.error('Erro ao atualizar turma:', error);
        return res.status(500).send('Ocorreu um erro ao atualizar a turma.')
    }//se não der pega o error 
}