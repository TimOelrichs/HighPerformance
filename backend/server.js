const   express = require("express"),
        bodyParser = require("body-parser"),
        cors = require("cors"),
        swaggerJsdoc = require("swagger-jsdoc"),
        swaggerUi = require("swagger-ui-express"),
        path = require('path');

//import to MongoDB if DB is empty
require('./util/DBimportAll');


const app = express();

var corsOptions = {
    origin: ["http://localhost:4200"], credentials: true
}

//middleware
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Add Router routes to express app
require("./routes/evaluationrecord.routes")(app);
require("./routes/salesman.routes")(app);

// Swagger
const specs = swaggerJsdoc(require('./config/swaggerConfig'));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

//set port, listen for request

let PORT = process.env.PORT || 8080;
PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

//login noch aus zu lagern
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        if(username === "admin" && password === "admin"){
            return done(null, username);
        } else {
            return done("unauthorized access", false);
        }
    }
));

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

const auth = () => {
    return (req, res, next) => {
        console.log("AAAAAPPPPPPPPIIIIIIIIIIIIIII")
        passport.authenticate('local', (error, user, info) => {
            if(error) res.status(400).json({"statusCode" : 200 ,"message" : error});
            req.login(user, function(error) {
                if (error) return next(error);
                next();
            });
        })(req, res, next);
    }
}

app.post('/authenticate', auth() , (req, res) => {
    res.status(200).json({"statusCode" : 200 ,"user" : req.user});
});

const isLoggedIn = (req, res, next) => {
    console.log('session ', req.session);
    if(req.isAuthenticated()){
        //console.log('user ', req.session.passport.user)
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

//login ende
