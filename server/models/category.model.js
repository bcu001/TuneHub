import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is requried'],
        trim: true,
    },
    slug:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
        trim:true,
    },
     isActive:{
        type:Boolean,
        default:true,
    }
}, { timestamps: true })

const Category = mongoose.model("Category", categorySchema);
export default Category;