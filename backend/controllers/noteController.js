import Note from "../models/note.js";

export const addnote=async(req,res)=>{
  try {
    const {name,email,companytype,template}=req.body
    if(!name || !email || !companytype || !template){
        return res.status(400).json({Message:"Empaty"})
    }
    const userexit=await Note.findOne({name:name})
    if(!userexit){
        const note=new Note({name,email,companytype,template})
        await note.save()
        return res.status(200).json({Message:"Done"})
    }else{
        return res.status(400).json({Message:"User allready exist"})
    }
    
  } catch (error) {
    return res.status(400).json({Message:error})
  }
}

export const deletnote=(req,res)=>{
res.send("deletnote")
}


