import express from 'express'
import  { addnote, deletnote }  from '../controllers/noteController.js'
const noteRoute = express.Router()

noteRoute.get('/', addnote)
noteRoute.post('/',addnote)
noteRoute.put('/',deletnote)

export default noteRoute