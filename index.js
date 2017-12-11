var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");
    http            = require("http"),
    server          = http.createServer(app),
    mongoose        = require('mongoose'),


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());



//================MONGODB==================//
var URI = 'mongodb://heroku_b1r92xqv:rhci47ihks9njo9jksagn777qf@ds149221.mlab.com:49221/heroku_b1r92xqv'//process.env.MONGODB_URI || 'localhost/userPasaPalabra'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 5000
var path = require('path')
var engines = require('consolidate')
var mongoose = require('mongoose');    
console.log(URI)
//mongoose.Promise = global.Promise
mongoose.connect(URI)
//mongoose.connect(URI+'?authMechanism=MONGODB-CR')
//mongoose.connect(URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('./models/user')
require('./models/preguntas')

// // Since this is an example, we'll clean up after ourselves.
// mongoose.connection.db.collection('preguntaspasapalabras').drop(function (err) {
// if(err) throw err;
//     // Only close the connection when your app is terminating
//     mongoose.connection.db.close(function (err) {
//         if(err) throw err;
//     });
// });




//==================API + Aplicacion==================//

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', __dirname + '/view');
app.engine('ejs', engines.mustache);
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pasa-palabra'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


//================== RUTAS API ==================//
var User = require('./controllers/user');
var Questions = require('./controllers/preguntas');

// API routes
// var routes = express.Router();

app.route('/api/user')
     .get(User.allUsers)
     .post(User.userInsert)
     .put(User.userUpdate);
app.route('/api/user/:id')
     .delete(User.userDelete);
app.route('/api/user/login').post(User.userByID)

app.route('/api/preguntas')
     .get(Questions.allQuestions)
     .post(Questions.newQuestion)
//app.use('/api', routes);

//console.log(reoutes)

//================APLICACION==================//
// var appProject=express();
// var router = express.Router();
// var portProject = process.env.PORT || 3000;

// appProject.use(express.static('./public'));

// var server=appProject.listen(portProject,() =>{
//     console.log(`Aplicacion --> http://localhost:${portProject}`);
// });