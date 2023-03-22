import mongoose from "mongoose"

const noteSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    companytype:{
        type:String,
        required:true
    },
    template:{
        type:String,
        required:true
    }
    // userId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     required:true
    // }
},{timestamps:true});

const Note=new mongoose.model("Note",noteSchema)

export default Note