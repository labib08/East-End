import express from "express";
import multer from "multer";
import { addItem, itemList, removeItem } from "../controllers/itemController.js";

const itemRouter = express.Router();

const storage = multer.diskStorage({
    destination: "assets",
    filename:(req, file, callback) => {
        return callback(null, `${Date.now()}${file.originalname}`)
    }
})

const assets = multer({storage:storage});

itemRouter.post("/add", assets.single("image"), addItem);
itemRouter.get("/list", itemList);
itemRouter.post("/remove", removeItem);

export default itemRouter;