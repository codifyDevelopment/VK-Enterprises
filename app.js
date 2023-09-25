const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
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
    cors({
        credentials: true,
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://127.0.0.1:5500",
            "vktech.info",
            "www.vktech.info",
            "https://vktech.info",
            "https://www.vktech.info",
            "test.vktech.info",
            "www.test.vktech.info",
            "https://test.vktech.info",
            "https://www.test.vktech.info",
        ],
    })
);

app.use(
    cookieParser("thisisthesecretkey", {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    })
);

app.use(
    session({
        secret: "thisisthesecretkey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        },
    })
);
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/services", require("./routes/api/services"));
app.use("/api/notification", require("./routes/api/notifications"));
app.use("/api/inquiries", require("./routes/api/inquiries"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/mcpcb", require("./routes/api/mcpcbService"));
app.use("/api/ss", require("./routes/api/ss"));
app.use("/api/ds", require("./routes/api/ds"));
app.use("/api/ms", require("./routes/api/ms"));
app.use("/api/s2p", require("./routes/api/s2p"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/views/404.html"));
});

app.post("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/views/404.html"));
});

module.exports = app;
