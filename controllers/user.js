var mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');

//GET - ALL USERS
exports.allUsers = (req, res) => {
	//Find All User SORT DESC correctas
	User.find({}).sort({correctas: -1}).exec( (err, users) => {
		if(err) res.send(500, err.message);
		res.status(200).jsonp(users);
	})
};

//GET - User by ID v
exports.userByID  = (req, res)=> {
	let params = req.body;
	
		let userNameCout = params.userName;
		let password = params.password;
		console.log(params)
		User.findOne({ userName: userNameCout.toLowerCase() }, (err, user) => {
			if (err) {
				res.status(500).send({message: false})
			}else {
				console.log("mongo -->", user);
				if (!user) {
					res.send({ message:false})
				}else {              
					// check if the password is the same of our database
					bcrypt.compare(password, user.password, (err, check)=>{
						// if the passwords is valid
						if (check) {
							// if the param gethash is send in request we generate the token
							if (params.gethash) {
								res.status(200).send({ token: jwt.createToken(user) });
							}else {
								// if the gethash is not set we return a user information
								res.status(200).send({ user });
							}
						}else { // If password not match
							res.send({message: false});
						}
					});
				}
			}
		})
};

//POST - Inser New User
exports.userInsert = (req, res) =>{
	let user = new User(); // instanciamos el objeto user con el modelo correspondiente
    
    let params = req.body; // recogemos todas las variables que nos lleguen por post

    user.userName = params.userName.toLowerCase();
    user.correctas = params.correctas;
	user.incorrectas = params.incorrectas;
	user.password = params.password
	user.ultimaPartida = new Date().getTime();
    user.role = 'role_user';
	User.findOne({ userName: user.userName }, (err, userMongo) => {
			if (err) {
				res.status(500).send({message: false})
			}else {
				if (!userMongo) { //Si no encuentra Usuario... Insertar
					if( params.password ) { //Con Contraseña.
						bcrypt.hash(params.password, null, null, function (err, hash) {
							user.password = hash;
							if( user.userName !== null) {
								user.save( (err, userStored) => {
									if (err) {
										res.status(500).send({message: 'Request Error'});
									}else {
										if ( !userStored ) {
											res.status(404).send({message: 'The user is void'});
										}else {
											res.status(200).send({ message: true });
										}
									}
								})
							}
						})
					}
				}else { // Si Encuentra Usuario... Error        
					res.send({message:false})
				}
			}
		})

};

//PUT - Update User
exports.userUpdate = (req, res) => {
	var user= req.body.userName.toLowerCase();
	console.log(req.body)
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