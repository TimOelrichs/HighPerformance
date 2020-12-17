const   express = require("express"),
        bodyParser = require("body-parser"),
        cors = require("cors"),
        swaggerJsdoc = require("swagger-jsdoc"),
        swaggerUi = require("swagger-ui-express"),
        path = require('path');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
