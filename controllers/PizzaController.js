const listaPizzas = require('../database/listaPizza.json');
const fs = require("fs");
const path = require('path');

const PizzaController = {
    index: (req, res) => {
        res.render('index', {listaPizzas});
        //res.send(listaPizzas);
    },
    show: (req, res) => {
        let id = req.params.id;
        let pizza = listaPizzas.find(
            pizza => pizza.id == id
        );
        res.render('pizza', {pizza});
    },
    create: (req, res) => {
        res.render('create-pizza');
    },
    store: (req, res) => {
        let {nome, preco, ingredientes} = req.body;
        ingredientes = ingredientes.split(', ');
        let id = listaPizzas.length + 1;

        //separando o nome img:
        let img = '/img/pizzas/' + req.files[0].originalname;

        listaPizzas.push({
            id: 0,
            nome: nome,
            preco: preco,
            img: img,
            ingredientes: ingredientes
        });
        
        fs.writeFileSync(path.join('database','listaPizza.json'), JSON.stringify(listaPizzas));
        res.redirect('/');
    },
    edit: (req, res) => {
        //desestruturação do let id = req.params.id:
        let {id} = req.params;
        let pizza = listaPizzas.find( (pizza) => {
            return pizza.id = id
        });
        res.render('edit-pizza', {pizza});
    },
    update: (req, res) => {
        let {id} = req.params;
        let pizza = listaPizzas.find( (pizza) => {
            return pizza.id = id
        });
        let {nome, ingredientes, preco} = req.body;
        pizza.nome = nome;
        pizza.preco = preco;
        pizza.ingredientes = ingredientes.split(', ');

        fs.writeFileSync(path.join('database','listaPizza.json'), JSON.stringify(listaPizzas));
        res.redirect('/');
    }
}

module.exports = PizzaController;