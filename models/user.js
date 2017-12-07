var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var userSchema = new Schema({
userName:    { type: String },
password:     { type: String },
correctas:   { type: Number },
incorrectas:  { type: Number },
ultimaPartida:  { type: Date }
});

module.exports = mongoose.model('UserPasaPalabra', userSchema);