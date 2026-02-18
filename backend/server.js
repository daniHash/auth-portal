require("dotenv").config();
require("./passport");

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

const authRoute = require("./routes/auth");

const app = express();

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }),
);

app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
