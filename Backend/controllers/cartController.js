import { userModel } from "../models/model.js";

const addToCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemID]) {
            cartData[req.body.itemID] = 1;
        }
        else {
            cartData[req.body.itemID] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message: "Added To Cart"});
    }
    catch (err) {
        console.log(err);
        res.json({success:false, message:"Error"})
    }
}

const removeFromCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemID] > 0) {
            cartData[req.body.itemID] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message: "Removed From Cart"})
    }
    catch (err) {
        console.log(err);
        res.json({success: false, message: "Error"})
    }
}

const deleteCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = userData.cartData;
        cartData = {};
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({ success: true, message: "Cart Emptied" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
};


export { addToCart, deleteCart, removeFromCart };

