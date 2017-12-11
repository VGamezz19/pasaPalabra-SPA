var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");
    http            = require("http"),
    server          = http.createServer(app),
    mongoose        = require('mongoose'),
    URI = process.env.MONGODB_URI || 'localhost/userPasaPalabra',
    PORT = process.env.PORT || 5000,
    path = require('path'),
    engines = require('consolidate'),
    User = require('./controllers/user'),
    Questions = require('./controllers/preguntas');
    db = mongoose.connection;

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    require('./models/user')
    require('./models/preguntas')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
//================MONGODB==================//
mongoose.connect(URI)
db.on('error', console.error.bind(console, 'connection error:'));
//==================API + Aplicacion==================//
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', __dirname + '/view');
app.engine('ejs', engines.mustache);
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pasa-palabra'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
//================== RUTAS API ==================//
app.route('/api/user')
    .get(User.allUsers)
    .post(User.userInsert)
    .put(User.userUpdate);
app.route('/api/user/:id')
    .delete(User.userDelete);
app.route('/api/user/login')
    .post(User.userByID)
app.route('/api/preguntas')
    .get(Questions.allQuestions)
    .post(Questions.newQuestion)