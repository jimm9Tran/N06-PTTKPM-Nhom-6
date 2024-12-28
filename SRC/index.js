const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require("moment");
const path = require('path'); // Add this line

require("dotenv").config();

const db = require("./config/database");
db.connect();

const route = require("./routers/client/index.route");
const routeAdmin = require("./routers/admin/index.route");

const app = express()
const port = process.env.PORT;
  
app.use(methodOverride("_method"));

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.set("views", "./view");
app.set("view engine", "pug");


// App Locals Variables
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Flash
app.use(cookieParser("jfisdaf"));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());

app.use(express.static("public"));

// Routes
route(app);
routeAdmin(app);
app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
        pageTitl: "404 Not Found"
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
}); 