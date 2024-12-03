import dotenv from 'dotenv';
import Stripe from "stripe";
import { orderModel, userModel } from "../models/model.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const deleteOrderDetails = async(req, res) => {
    try {
        const deleteOrder = await orderModel.findOneAndDelete({userId: req.body.userId});
        if (!deleteOrder) {
            return res.json({success: false, message: "Error Finding User"});
        }
        res.json({success: true, message: "Successfully Deleted Order"});
    }
    catch (err) {
        console.log(err);
        res.json({success: false, message:"Error Deleting"});
    }
}

const getOrderDetails = async(req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        res.json({success: true, message: "Successfully Saved Order"})
    }
    catch(err) {
        console.log(err);
        res.json({success:false, message: "Error Checking Out. Please Try again"})
    }
}

const placeOrder = async(req, res) => {
    const url = "http://localhost:3000"
    try {
        const newOrder = await orderModel.findOneAndUpdate({userId: req.body.userId}, {address: req.body.formData});
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        cartData = {};
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        const line_items = newOrder.items.map((item) =>({
            price_data: {
                currency: "aud",
                product_data: {
                    name:item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "aud",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2*100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true, session_url:session.url})
    }
    catch (err) {
        console.log(err);
        res.json({success:false, message: "Error Checking Out"})
    }
}

const verifyOrder = async(req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message: "Payment Successful"});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message: "Payment Failed"});
        }
    } catch (err) {
        console.log(err);
        res.json({success:false, message: "Error"});
    }
}

export { deleteOrderDetails, getOrderDetails, placeOrder, verifyOrder };

