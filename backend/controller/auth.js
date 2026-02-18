const bcrypt = require("bcrypt");
const pool = require("../db");

exports.loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(403).json({ success: false, message: "Not Authorized" });
  }
};

exports.loginFailed = (req, res) => {
  res.status(401).json({ success: false, message: "Login Failed" });
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy();
    res.redirect(process.env.CLIENT_URL);
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0)
      return res.status(400).json({ message: "ایمیل قبلاً ثبت شده" });

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed],
    );
    res.status(201).json({ message: "ثبت نام موفق" });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(401).json({ message: "کاربر یافت نشد" });

    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) return res.status(401).json({ message: "پسورد اشتباه" });

    req.login(rows[0], (err) => {
      if (err) return res.status(500).json({ message: "خطا" });
      res.json({ message: "لاگین موفق", user: rows[0] });
    });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور", error: err.message });
  }
};
