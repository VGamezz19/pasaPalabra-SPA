var mongoose = require('mongoose');
const User = require('../models/user');

//GET - ALL USERS
exports.allUsers = (req, res) => {
	User.find((err, users) => {
        if(err) res.send(500, err.message);

        console.log('GET /allUsers')

		res.status(200).jsonp(users);
    });
};

//GET - User by ID 
exports.userByID  = (req, res)=> {
	User.findById(req.params.id, (err, userId) => {
    if(err) return res.send(500, err.message);

    console.log('GET /usuario/' + req.params.id);
		res.status(200).jsonp(userId);
    });
};

//POST - Inser New User
exports.userInsert = (req, res) =>{
	console.log('POST');
	console.log(req.body);

	var user = new User({
        userName:       req.body.userName,
        password:           req.body.password,
        correctas:      req.body.correctas,
        incorrectas:    req.body.incorrectas,
        ultimaPartida:  req.body.ultimaPartida
	});

	user.save((err, user) => {
		if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(user);
	});
};

//PUT - Update User
exports.userUpdate = (req, res) => {
    var id = req.params.id
	User.findById(id, (err, userUpdate) => {

        userUpdate.correctas = req.body.correctas;
        userUpdate.incorrectas = req.body.incorrectas;
        userUpdate.ultimaPartida = req.body.ultimaPartida;         

		userUpdate.save((err) =>{
			if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(userUpdate);
		});
	});
};

//DELETE - Delete User
exports.userDelete = (req, res)=> {
    var id = req.params.id
	User.findById(id, (err, userDelete) =>{
		userDelete.remove((err) =>{
			if(err) return res.status(500).send(err.message);
            res.status(200).send();
		})
	});
};