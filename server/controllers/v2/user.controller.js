import User from "../../models/user.model.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        if (users.length === 0) {
            const error = new Error("no users found");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: {
                users
            }
        })
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: {
                user
            }
        })
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        // get name , email from client 
        const id = req.params.id;
        const { name, email } = req.body;

        const updates = {};

        // check if name and email are not empty
        if (!name || !email) {
            const error = new Error("name and email are requried");
            error.statusCode = 422;
            throw error;
        }

        updates.name = name;
        updates.email = email;

        

        // update if above steps are done
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: updatedUser
        });


    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}
