var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var preguntasSchema = new Schema({
letter:     String ,
answer:       String,
status:     Number ,
question:    String
});

module.exports = mongoose.model('preguntasPasaPalabra', preguntasSchema);
