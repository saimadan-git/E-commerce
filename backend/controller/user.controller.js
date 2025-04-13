import User from "../models/Register.js";
//Get User Profile by ID
export const getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const getUser = await User.findById(userId);
        if (!userId) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                data: {}
            });
        }
        res.status(200).json({
            status: "success",
            message: "User found",
            data: {
                id: getUser._id,
                name: getUser.name,
                email: getUser.email,
                mobileNumber: getUser.mobileNumber,
                addressess: getUser.addressess,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
};
//Profile Update
export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email, mobileNumber } = req.body;
    try {
        //define the fields to be updated  
        const updatedData = {
            name: name,
            email: email,
            mobileNumber: mobileNumber,
        };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                data: {}
            });
        }
        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                mobileNumber: updatedUser.mobileNumber,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
};