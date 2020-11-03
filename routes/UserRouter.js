var express = require('express');
var Router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/user_img')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage});

const userController = require('../controllers/userController');

Router.get('/cadastro', userController.show);
Router.post('/cadastro', userController.create);
Router.get('/login', userController.login);
Router.post('/login', userController.index);

module.exports = Router;