import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetSchema);
export default PasswordResetToken;