import bcrypt from 'bcryptjs'
import { User } from '../../models/User.js';
import jwt from 'jsonwebtoken'


//register

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // console.log("Request body:", req.body);

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
                message: "User already registered with the same user",
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

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Login here
        const existUser = await User.findOne({email})
        if (!existUser) {
            return res.status(400).json({
                success : false,
                message : "User is not exist! Please register first"
            })
        }


        const isCorrectPassword = await bcrypt.compare(password , existUser.password)

        if (!isCorrectPassword) {
            return res.status(401).json({
                success : false,
                message : "Password is incorrect !"
            })
        }

        const token = jwt.sign({
            id : existUser._id,
            role : existUser.role,
            email : existUser.email
        }, "CLIENT_SECRET_KEY" , {expiresIn : "60m"})

        const options = {
            httpOnly : true,
            secure : false
        }

        res.cookie('token' ,token , options).json({
            success : true,
            message : "Logged in Successfully",
            user : {
                email : existUser.email,
                role : existUser.role,
                id : existUser._id
            }
        })

    } catch (error) {
        console.log("Error from login", error);
        res.status(500).json({
            success: false,
            message: "An error occurred",
        });
    }
};


//  logout


export const logoutUser = async (req,res) => {
    res.cookie('token' ).json({
        success :true,
        message : "Logged out Successfully"
    })
}
 
// auth middlewares 
export const authMiddleware = async ( req,res,next) => {
    const token = req.cokkies.token;
    if (!token) {
        return res.status(401).json({
            success : false,
            message : "UnAuthorized user!"
        })
    }

    try {
        const decodedToken = jwt.verify(token , CLIENT_SECRET_KEY);
        req.user = decodedToken
        next()
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "UnAuthorized user!"
        })
    }


}