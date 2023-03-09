var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");

var indexRouter = require("./routes/index");

var app = express();

// connect to database
const db = require("./models");
const passport = require("passport");
(async () => {
    try {
        await db.sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await db.sequelize.sync({
            force: false,
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", require("./routes/auth"));

module.exports = app;
