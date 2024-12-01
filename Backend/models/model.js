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

const orderSchema = new mongoose.Schema({
    userId: {type:String, required: true},
    items: {type:Array, required: true},
    amount: {type: Number, required:true},
    address: {type:Object, required: true},
    status: {type: String, default: "Waiting For Payment"},
    date: {type: Date, default: Date.now},
    payment: {type: Boolean, default: false},
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export { itemModel, orderModel, userModel };

