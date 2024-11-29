import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/accountRoute.js';
import cartRouter from './routes/cartRoute.js';
import itemRouter from './routes/itemRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.use("/api/item", itemRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/images", express.static('assets'))

app.get("/", (req, res) =>{
    res.send("Welcome to East End API");
})

app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
})

mongoose.connect(process.env.MONGO_URI, {

}).then(() =>console.log("MongoDB connected"))
    .catch(er => console.log(er));

