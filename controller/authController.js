const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// generating JWT Token

const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );
};

// Signup

const signup = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email});

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }
     // Hash Password
     const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "User created successfully",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Login

const login = async (req, res) => {
    try{
        const {email, password } = req.body;
        const user = await User.findOne({ email});

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
         });
    }
};

module.exports = {
    signup,
    login
};