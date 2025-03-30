import { db } from "../connect.js";

export const editUser = (req, res) => {
    const { username, email, userID } = req.body;

    // Validate input
    if (!userID || !username || !email) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Update query
    const query = "UPDATE users SET username = ?, email = ? WHERE userID = ?";

    db.query(query, [username, email, userID], (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({ message: err.message, error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile updated successfully" });
    });
};

export const getUsers = (req, res) => {
    const query = "SELECT userID, username, email, role FROM users";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        return res.status(200).json({ users: results });
    });
};

// Edit User Role
export const editRole = (req, res) => {
    const { userID, role } = req.body;

    // Validate input
    if (!userID || !role) {
        return res.status(400).json({ message: "User ID and role are required!" });
    }

    // Update user role query
    const query = "UPDATE users SET role = ? WHERE userID = ?";

    db.query(query, [role, userID], (err, result) => {
        if (err) {
            console.error("Error updating role:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User role updated successfully" });
    });
};

// Delete User
export const deleteUser = (req, res) => {
    const { userID } = req.body;

    // Validate input
    if (!userID) {
        return res.status(400).json({ message: "User ID is required!" });
    }

    // Delete user query
    const query = "DELETE FROM users WHERE userID = ?";

    db.query(query, [userID], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    });
};