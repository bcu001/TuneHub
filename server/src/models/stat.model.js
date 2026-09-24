import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
    playCount :{
        type:Number,
        default: 0
    },
    likeCount :{
        type:Number,
        default:0
    }
}, {timestamps:true})

const Stat = mongoose.model("Stat", statSchema);
export default Stat;