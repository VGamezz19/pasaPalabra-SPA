'use strict'

let mongoose = require('mongoose')
let Pregunta = require('../models/preguntas')
exports.allQuestions = (req, res, next) => {
    Pregunta.find({}).sort('letter').exec(function (err, preguntas) {
            if(err) return res.status(500).send({message: 'Problemas al cargar las preguntas'})
            let i = 0,
                preguntasRep = [],
                preguntasfinales = []
            for(let i = 0; i< preguntas.length; i ++){
                preguntasRep.push(preguntas[i])
                if((i + 1) % 3 === 0 && i !== 0){
                    let x = Math.trunc(Math.random() * 3)
                        preguntasfinales.push(preguntasRep[x])
                        preguntasRep = []
                }     
            }
            res.status(200).jsonp(preguntasfinales);   
      })
    }
exports.newQuestion = (req, res, next) => {
	let pregunta = new Pregunta(), // instanciamos el objeto user con el modelo correspondiente
        params = req.body; // recogemos todas las variables que nos lleguen por post
    pregunta.letter = params.letter
    pregunta.answer = params.answer
	pregunta.status = params.status
    pregunta.question = params.question
    pregunta.save( (err, question) => {
        if (err) {
            return next(err)
        }else {
            if ( !question ) {
                res.status(404).send({message: 'The user is void'})
            }else {
                res.status(200).send({ message: true })    
            }
        }
    })
                    
};