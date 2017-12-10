var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");
    http            = require("http"),
    server          = http.createServer(app),
    mongoose        = require('mongoose');
    const path = require('path')
    

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// ,"nodemon": "^1.12.5"
//================MONGODB==================//
console.log(process.env)
app.set('port', (process.env.PORT || 8000));
var mongoPort = process.env.MONGODB_URI || 'localhost/userPasaPalabra' 

mongoose.connect(mongoPort, (err, res)=> {
    useMongoClient: true;
    if(err) {
        console.log('ERROR: connecting to Database... --> ' + err);
    }else {
        console.log ("Mongo Contectado ..." + mongoPort)
        //==================API==================//
        //Por si acaso, primero contectamos el Servidor con MongoDB
       // app.use(express.static(path.join(__dirname, 'public')))
        // app.use('/', express.static(__dirname + '/public'));
        // //app.use(express.static('./public'));

        // //var router = express.Router();
        // app.get('/', (req, res) => {
        //     res.sendFile('public/pasa-palabra.html', { root: __dirname });
        // });
       // app.use(router);

        app.listen(app.get('port'), () => {
            console.log(`you are listening at port ${app.get('port')}`);
        });
    }
    
});
//================== RUTAS API ==================//
var User = require('./controllers/user');
var Questions = require('./controllers/preguntas');

// API routes
var routes = express.Router();

routes.route('/user')
     .get(User.allUsers)
     .post(User.userInsert)
     .put(User.userUpdate);
routes.route('/user/:id')
     .delete(User.userDelete);
routes.route('/user/login').post(User.userByID)

routes.route('/preguntas')
     .get(Questions.allQuestions)
     .post(Questions.newQuestion)

app.use('/api', routes);


//================APLICACION==================//
// var appProject=express();
// var router = express.Router();
// var portProject = process.env.PORT || 3000;

// appProject.use(express.static('./public'));

// var server=appProject.listen(portProject,() =>{
//     console.log(`Aplicacion --> http://localhost:${portProject}`);
// });