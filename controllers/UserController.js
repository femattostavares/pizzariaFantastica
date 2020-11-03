const user = require('../database/user.json');
const fs = require("fs");
const path = require('path');

const UserController = {
    show: (req, res) => {
        res.render('user-form');
    },
    create: (req, res) => {
        let {nome, email, senha, conf} = req.body;
        
        user.push({
            nome: nome,
            email: email,
            senha: senha,
            conf: conf
        });

        fs.writeFileSync(path.join('database', 'user.json'), JSON.stringify(user));
        res.redirect('/');
    },
    login: (req, res) => {
        res.render('user-login');
    },
    index: (req, res) => {
        let {email, senha} = req.body;

        let usuarioEncontrado = user.find( (usuario) => {
        return usuario.email == email
        });

        if (usuarioEncontrado.email == email && usuarioEncontrado.senha == senha) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.send("Usuário não cadastrado!");
        };
    }
}

module.exports = UserController;