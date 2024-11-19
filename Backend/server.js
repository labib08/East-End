import cors from "cors";
import express from "express";

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