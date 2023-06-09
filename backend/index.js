import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import noteRoute from './routes/noteRoutes.js'
import userRoute from './routes/userRoutes.js'
import mongoose from 'mongoose'


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/users', userRoute)
app.use('/notes', noteRoute)


app.get('/', (req, res) => {
    res.send("hellow")
})

const main = async () => {
    try {
        await mongoose.connect('mongodb+srv://mrlucifer9651:<password>@cluster0.zbwjrqi.mongodb.net/?retryWrites=true&w=majority');
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}
main()

const port = 4000;
app.listen(port, () => {
    console.log(`server running at port ${port}`)
})