import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    console.log('🔐 Login attempt:', { username: req.body?.username, hasPassword: !!req.body?.password });
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      console.log('❌ User not found:', username);
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for user:', username);
      return res.status(400).json({ error: "Invalid password" });
    }

    console.log('✅ Login successful for user:', username);
    res.status(200).json({ user: { username: user.username }, message: "Login successful!" });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};
