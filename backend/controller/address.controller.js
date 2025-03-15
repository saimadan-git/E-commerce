import User from "../models/Register.js";
//Add Address
export const addAddress = async (req, res) => {
    try {
        const { name,mobileNumber,pincode,area,address,city,state,landmark,alternateMobile,type,userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        user.addressess.push({ name,mobileNumber,pincode,area,address,city,state,landmark,alternateMobile,type });
        await user.save();
        return res.status(200).json({
            status: "success",
            message: "Address added successfully",
            data: user.addressess,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
}
//Get Address
export const getAddressess = async (req, res) => {
    try {
        const { userId } = req.params;   
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "User address",
            data: user.addressess,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
}
//Get Address by ID
export const getAddressById = async (req, res) => {
    const { userId, addressId } = req.params;
    try {
        const user = await  User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        const address = user.addressess.find((address) => address._id == addressId);
        if (!address) {
            return res.status(404).json({
                status: "error",
                message: "Address not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Address found",
            data: address,
        });
    }catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
}
//Update Address
export const updateAddress = async (req, res) => {
    const { userId, addressId } = req.params;
    const { name,mobileNumber,pincode,area,address,city,state,landmark,alternateMobile,type } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        const updatedAddress = {
            name,
            mobileNumber,
            pincode,
            area,
            address,
            city,
            state,
            landmark,
            alternateMobile,
            type,
        }
        const updatedUser = user.addressess.findOneAndUpdate(addressId, updatedAddress, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                status: "error",
                message: "Address not found",
            });
        }
        await user.save();
        return res.status(200).json({
            status: "success",
            message: "Address updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
}