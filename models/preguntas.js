var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var preguntasSchema = new Schema({
letter:    {type : String} ,
answer:      {type : String},
status:    {type : Number} ,
question:   {type : String}
});

module.exports = mongoose.model('preguntasPasaPalabra', preguntasSchema);
