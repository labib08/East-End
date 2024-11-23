import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price : {type: Number, required: true},
    description : {type: String, required: true},
    type: {type: String, required: true},
})

const itemModel = mongoose.models.item || mongoose.model("item", itemSchema);

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    cartData: {type:Object, default:{}},
}, {minimize:false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export { itemModel, userModel };
