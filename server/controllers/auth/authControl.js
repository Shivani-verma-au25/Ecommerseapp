import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../models/User.js';


//register

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    console.log("Request body:", req.body);

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required: username, email, and password.",
        });
    }

    try {
        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered.",
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create the new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(200).json({
            success: true,
            message: "Registration has been completed.",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log("Error from Register:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Username or email already exists.",
            });
        }

        res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
};


// login

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Login here

    } catch (error) {
        console.log("Error from login", error);
        res.status(500).json({
            success: false,
            message: "An error occurred",
        });
    }
};


