// Import de module
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo') //stocker les cookies dans mongodb
const connectFlash = require('connect-flash') //customize le message d'erreur
const {stripTags} = require('./helpers/hbs')
const port = process.env.PORT || 3000


/*
 * Controllers
 *************/

// Articles
const articleSingleController = require ('./controllers/articleSingle')
const articleAddController = require ('./controllers/articleAdd')
const articlePostController = require ('./controllers/articlePost')
const homePage = require ('./controllers/homePage')

// User
const userCreate = require ('./controllers/userCreate')
const userRegister = require ('./controllers/userRegister')
const userLogin = require ('./controllers/userLogin')
const userLoginAuth = require ('./controllers/userLoginAuth')
const userLogout = require ('./controllers/userLogout')

const app = express();

const urlDb = 'mongodb+srv://lb:170578@cluster0-jjxz6.mongodb.net/test?retryWrites=true&w=majority'
// const urlDb = 

mongoose.connect( urlDb , {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({
 secret: 'securite',
 name: 'biscuit',
 saveUninitialized:true,      //false efface les cookies, true reinitialise les cookies
 resave:false,    
 
 store: new mongoStore(
    {mongooseConnection: mongoose.connection}
 )
}))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileupload())



/*
 * Middleware
 ************/
const auth                = require ("./middleware/auth");
const redirectAuthSuccess = require ('./middleware/redirectAuthSuccess'); //redirection apres authentification
const articleValidPost    = require('./middleware/articleValidPost');



var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

app.use(express.static('public'));


//Route
app.engine('hbs', exphbs({ 
    extname: 'hbs',
    helpers: {
        stripTags: stripTags
    },
    defaultLayout: 'main' 
}));

app.set('view engine', 'hbs');

app.use('*', (req, res,next) =>  {
    res.locals.user = req.session.userId;
    console.log( res.locals.user);
    next()
})

// Page home
app.get("/", homePage)

// Articles
app.get("/articles/add", auth, articleAddController )
app.get("/articles/:id", auth, articleSingleController)
app.post("/articles/post" ,auth, articleValidPost, articlePostController)


// Users
app.get('/user/create',redirectAuthSuccess, userCreate)
app.post('/user/register',redirectAuthSuccess, userRegister)
app.get('/user/login',redirectAuthSuccess, userLogin)            //
app.post('/user/loginAuth',redirectAuthSuccess, userLoginAuth)   // si tu postes dans user/loginAuth tu executes le controllers userLoginAuth
app.get('/user/logout', userLogout)  //si l'utilisateur va sur l'url /user/logout tu execute le controller userlogout

//Contact
app.get("/contact", (req, res) => {
    res.render("contact")
})

app.use( (req,res) => {
    res.render('error404')
})

app.listen(port, function () {
    console.log("le serveur tourne sur le port " + port);
})