const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();
const db = require("./db");

(async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieParser("thisisthesecretkey", {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/user", require("./routes/api/user"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/views/404.html"));
});

app.post("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/views/404.html"));
});

module.exports = app;
