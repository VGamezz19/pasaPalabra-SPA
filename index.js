var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");
    http            = require("http"),
    server          = http.createServer(app),
    mongoose        = require('mongoose'),
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

 var connection = require('./env/' + process.env.NODE_ENV + '.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());



//================MONGODB==================//
//var mongoPort = process.env.MONGODB_URI || 'localhost/userPasaPalabra'
var PORT = process.env.PORT || 5000
var path = require('path')
var engines = require('consolidate')

console.log("entra", process.env.MONGODB_URI)
console.log(connection)
mongoose.connect(connection.db, (err, res)=> {
    useMongoClient: true;
    console.log("entra2", process.env.MONGODB_URI)
    if(err) {
        console.log('ERROR: connecting to Database... --> ' + err);
    }else {
        console.log("entra3", process.env.MONGODB_URI)
        console.log ("Mongo Contectado ..." )
    }
    
});

require('./models/user')
require('./models/preguntas')
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