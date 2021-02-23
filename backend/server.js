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

//login noch aus zu lagern
const session = require('express-session');
const passport = require('./middleware/passport.middleware')

/*
app.use(session({ secret: 'anything', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
*/

//middleware
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Add Router routes to express app
//require("./routes/auth.routes")(app, passport);
require("./routes/auth.routes")(app);
require("./routes/evaluationrecord.routes")(app);
require("./routes/salesman.routes")(app);
require("./routes/sales.routes")(app);


// Swagger
const specs = swaggerJsdoc(require('./config/swaggerConfig'));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

//set port, listen for request

let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})


/*
app.post("/login", auth(), (req, res) => {
    const id  = req.body.id,
    password = req.body.password;
})



app.post('/authenticate', auth() , (req, res) => {
    console.log("log in")
    res.status(200).json({"statusCode" : 200 ,"user" : req.user});
});


app.post('changePassword', auth(), (req, res) => {

})

app.post('/logout',  (req, res) => {
    console.log("log out")
    req.logOut();
    res.status(200).json({"statusCode" : 200 });
});

const isLoggedIn = (req, res, next) => {
    console.log('session ', req.session);
    if(req.isAuthenticated()){
        //console.log('user ', req.session.passport.user)
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

*/
//login ende
