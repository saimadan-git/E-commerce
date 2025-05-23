import User from "../models/Register.js";
//Add Address
export const addAddress = async (req, res) => {
    try {
        const { name, mobileNumber, pincode, area, address, city, state, landmark, alternateMobile, type, customType, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        const isDefault = user.addressess.length === 0;
        user.addressess.push({ name, mobileNumber, pincode, area, address, city, state, landmark, alternateMobile, type, customType, default: isDefault });
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
        const sortedAddressess = user.addressess.sort((a, b) => b.createdAt - a.createdAt);
        return res.status(200).json({
            status: "success",
            message: "User address",
            data: sortedAddressess,
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
        const user = await User.findById(userId);
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
    } catch (err) {
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
    const { name, mobileNumber, pincode, area, address, city, state, landmark, alternateMobile, type, customType,isDefault } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        const addressOne = user.addressess.find((address) => address._id == addressId);
        if (!addressOne) {
            return res.status(404).json({
                status: "error",
                message: "Address not found",
            });
        }
        if (name || mobileNumber || pincode || area || address || city || state || landmark || alternateMobile) {
            addressOne.name = name;
            addressOne.mobileNumber = mobileNumber;
            addressOne.pincode = pincode;
            addressOne.area = area;
            addressOne.address = address;
            addressOne.city = city;
            addressOne.state = state;
            addressOne.landmark = landmark;
            addressOne.alternateMobile = alternateMobile;
        }
        if (type) {
            if (type === "other") {
                addressOne.type = "other";
                addressOne.customType = customType;
            } else {
                addressOne.type = type;
                addressOne.customType = "";
            }
        }
        if (isDefault) {
            user.addressess.forEach((address) => {address.default = false});
           addressOne.default = true;
        }
        await user.save();
        return res.status(200).json({
            status: "success",
            message: "Address updated successfully",
            data: addressOne,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
}
//Delete Address by ID
export const deleteAddress = async (req, res) => {
    const { userId, addressId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        const addressIndex = user.addressess.findIndex((address) => address._id == addressId);
        if (addressIndex == -1) {
            return res.status(404).json({
                status: "error",
                message: "Address not found",
            });
        }
        user.addressess.splice(addressIndex, 1);
        await user.save();
        return res.status(200).json({
            status: "success",
            message: "Address deleted successfully",
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