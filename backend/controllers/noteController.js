import Note from "../models/note.js";


export const addnote = async (req, res) => {
  try {
    const { name, email, companytype, template } = req.body
    if (!name || !email || !companytype || !template) {
      return res.status(400).json({ Message: "Empaty" })
    }
    const userexit = await Note.findOne({ name: name })
    if (!userexit) {
      const note = new Note({ name, email, companytype, template })
      await note.save()
      return res.status(200).json({ Message: "Done" })
    } else {
      return res.status(400).json({ Message: "User allready exist" })
    }

  } catch (error) {
    return res.status(400).json({ Message: error })
  }
}

export const getdata = async (req, res) => {
  try {
    const item = await Note.find()
    if (item) return res.status(200).json({ Message: item })
  } catch (error) {
    return res.status(400).json({ Message: error })
  }
}

export const putOneData = async (req, res) => {
  try {
    const id = req.params.id
    const { name, email, companytype, template } = req.body
    if (!name || !email || !companytype || !template) {
      return res.status(400).json({ Message: "Empaty" })
    }
    const item = await Note.findByIdAndUpdate(id,req.body,{
      new:true
    })
    if (item) return res.status(200).json({ Message: "Done" })
    return res.status(404).json({ message: "NOT FOUND" })
  } catch (error) {
    return res.status(400).json({ Message: error })
  }
}

export const deletOneData =async (req, res) => {
  try {
    const id=req.params.id
    const item=await Note.findByIdAndDelete(id,{
      new:true
    })
    if (item) return res.status(200).json({ Message: "Done" })
  } catch (error) {
    return res.status(400).json({ Message: error })
  }
}


