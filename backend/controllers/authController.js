const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper function to generate a JWT token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Controller: User registration
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({ email, password });
    console.log("✅ User created:", user);

    let token;
    try {
      token = generateToken(user._id);
    } catch (tokenError) {
      console.error("❌ JWT error:", tokenError.message);
      return res.status(500).json({ error: "Token generation failed" });
    }

    res.status(201).json({ token });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller: User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
