import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRE_IN } from '../../config/env.js'

export const validate = async (req, res) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

            token = req.headers.authorization.split(" ")[1];
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) throw new Error("Unauthorized");

        res.status(200).json({
            success:true,
            data:{
                user
            }
        })
    } catch (error) {
        return res.status(401).json({ message: error.message || "Unauthorized" });
    }
}


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const error = new Error("wrong email");
            error.statusCode = 401;
            throw error;
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            const error = new Error("password is wrong");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });

        return res.status(200).json({
            success: true,
            message: "user signed in successfully",
            data: {
                token,
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role,
                }
            }
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        })
    }
}
export const signout = async (req, res) => {

}

export const signup = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error("email already in use");
            error.statusCode = 409;
            throw error;
        }

        const hassPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hassPassword });

        // console.log("ok")
        return res.status(201).json({
            success: true,
            message: "User Created",
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        })
    }
}