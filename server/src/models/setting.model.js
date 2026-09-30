import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system"
    },
})

const Setting = mongoose.model("Setting", settingSchema);
export default Setting;