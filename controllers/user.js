var mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
//GET - ALL USERS
exports.allUsers = (req, res,next) => {
	//Find All User SORT DESC correctas
	User.find({}).sort({correctas: -1}).exec( (err, users) => {
		if(err) res.status(500).send(err.message);
		res.status(200).jsonp(users);
	})
}
//GET - User by ID v
exports.userByID  = (req, res,next)=> {
	let params = req.body
		userNameCout = params.userName
		password = params.password
		User.findOne({ userName: userNameCout.toLowerCase() }, (err, user) => {
			if (err) return res.send(err)
			if (!user) return res.send({ message:false})
			bcrypt.compare(password, user.password, (err, check)=>{
				// if the passwords is valid
				if (check) {
					// if the param gethash is send in request we generate the token
					if (params.gethash) return res.status(200).send({ token: jwt.createToken(user) })
					// if the gethash is not set we return a user information
					res.status(200).send({ user })
				}else { // If password not match
					res.send({message: false})
				}
			})
		})
}
//POST - Inser New User
exports.userInsert = (req, res) =>{
	let user = new User(), // instanciamos el objeto user con el modelo correspondiente
		params = req.body; // recogemos todas las variables que nos lleguen por post

    user.userName = params.userName.toLowerCase()
    user.correctas = params.correctas
	user.incorrectas = params.incorrectas
	user.password = params.password
	user.ultimaPartida = new Date().getTime()
	user.role = 'role_user'
	User.findOne({ userName: user.userName }, (err, userMongo) => {
		if (err) return res.status(500).send(500, err.message)
		if (userMongo) return res.send({message: false, user: params.userName})   
		if (!params.password) return res.status(500).send( 'Mandatory password')   
		if (!user.userName) return res.status(500).send( 'Mandatory userName')

		bcrypt.hash(params.password, null, null, function (err, hash) {
			if(err) return res.send(500, err.message);
			user.password = hash
				user.save( (err, userStored) => {
					if(err) return res.status(500).send( err.message)
					if(!userStored) return res.status(404).send({message: 'The user is void'})

					return res.status(200).send({ message: "Insert Succes!" })           
				})
			})
		})
};
//PUT - Update User
exports.userUpdate = (req, res) => {
	var user= req.body.userName.toLowerCase();
	User.findOne({ userName: user }, (err, userUpdate) => {
        userUpdate.correctas = req.body.correctas;
        userUpdate.incorrectas = req.body.incorrectas;
        userUpdate.ultimaPartida = new Date().getTime();        
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