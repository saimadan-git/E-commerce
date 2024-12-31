import User from '../models/Register.js';

export const register = async (req, res, next) => {
    const { name, email, mobileNumber, password } = req.body;
    try {
        const ExUser = await User.findOne({ email });
        if (ExUser) {
            return res.status(400).json({
            status: "error",
            message: "User already exists",
            });
        }
        const newUser = new User({
            name,
            email,
            mobileNumber,
            password,
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
            name: savedUser.name,
            email: savedUser.email,
            mobileNumber: savedUser.mobileNumber,
            password: savedUser.password,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
}