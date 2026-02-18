const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const googleId = profile.id;
                const email = profile.emails[0].value;
                const name = profile.displayName;

                const [rows] = await pool.query(
                    "SELECT * FROM users WHERE google_id = ?",
                    [googleId],
                );

                if (rows.length > 0) {
                    return done(null, rows[0]);
                }

                const [result] = await pool.query(
                    "INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)",
                    [googleId, name, email],
                );

                const [newUser] = await pool.query(
                    "SELECT * FROM users WHERE id = ?",
                    [result.insertId],
                );

                done(null, newUser[0]);
            } catch (err) {
                done(err, null);
            }
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
            id,
        ]);
        done(null, rows[0]);
    } catch (err) {
        done(err, null);
    }
});
