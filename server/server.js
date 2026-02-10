import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'



//Initialize express

const app = express()
// connect to database
await connectDB()


app.use(cors())

//routes  
app.get('/',(req,res)=> res.send("API WORKING"))
app.post("/clerk", express.json(), clerkWebhooks);

const PORT = process.env.PORT || 5000

app.listen(PORT,() =>{
    console.log(`Server is running om Port ${PORT}`)
})