'use strict';

var mongoose = require('mongoose');
var Pregunta = require('../models/preguntas');
exports.allQuestions = (req, res, next) => {
//     Pregunta.find({}, (err,preguntas) => {
//         console.log(preguntas)
//     if(err) {
//       return next(err);
//     } else {
//       res.status(200).jsonp(preguntas);
//     }
//   });
    Pregunta.find({}, function (err, preguntas) {
            console.log(preguntas)
            if(err) {
            return next(err);
            } else {
            res.status(200).jsonp(preguntas);
            }
      })
}

exports.newQuestion = (req, res, next) => {
	let pregunta = new Pregunta(); // instanciamos el objeto user con el modelo correspondiente
    
    let params = req.body; // recogemos todas las variables que nos lleguen por post

    pregunta.letter = params.letter
    pregunta.answer = params.answer;
	pregunta.status = params.status;
    pregunta.question = params.question
    
    pregunta.save( (err, question) => {
        if (err) {
            res.status(500).send({message: 'Request Error'});
        }else {
            if ( !question ) {
                res.status(404).send({message: 'The user is void'});
            }else {
                res.status(200).send({ message: true });
            }
        }
    })
                    sta
};