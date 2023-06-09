import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(todoRoutes)

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jqvo43m.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
    .connect(uri, options)
    .then(() => app.listen(PORT, console.log(`Server is running on port: ${PORT}`)))
    .catch(error => {
        throw error
    })