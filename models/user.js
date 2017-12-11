var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var userSchema = new Schema({
userName:     String ,
password:      String ,
correctas:    Number ,
incorrectas:   Number ,
ultimaPartida:   Date 
});

module.exports = mongoose.model('UserPasaPalabra', userSchema);