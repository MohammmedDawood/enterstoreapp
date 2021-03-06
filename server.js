const express = require("express");
const bodyParser = require("body-parser");
var morgan = require('morgan')
const cors = require("cors");

const app = express();


//request logger
app.use(morgan('tiny'))

app.use(cors());
app.options('*', cors())

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// //cross Origin
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// db connection
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to sara application."
    });
});

// app routes
require("./app/routes/stores.route")(app);
require("./app/routes/clientslogs.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});