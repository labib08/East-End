import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) =>{
    res.send("Welcome to East End API");
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
})

mongoose.connect(process.env.MONGO_URI, {

}).then(() =>console.log("MongoDB connected"))
    .catch(er => console.log(er));