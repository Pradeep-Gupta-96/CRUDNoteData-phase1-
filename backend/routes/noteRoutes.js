import express from 'express'
import { addnote, deletOneData, getdata, putOneData } from '../controllers/noteController.js'
const noteRoute = express.Router()

noteRoute.get('/', getdata)
noteRoute.post('/', addnote)
noteRoute.put('/:id', putOneData)
noteRoute.delete('/:id', deletOneData)

export default noteRoute