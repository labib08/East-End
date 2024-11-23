import bcrypt from "bcrypt";
import validator from "validator";
import { userModel } from "../models/model.js";
const loginUser = (req, res) => {

}
const createAccount = async(req, res) => {
    const {name, password, email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: "User already exists"})
        }
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }
        if (password.length < 3) {
            return res.json({success: false, message: "Please enter a strong password"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel ({
            name: name,
            email: email,
            password: hashedPassword,
        })
        const user = await newUser.save()
    }
    catch (err) {

    }
}
export { createAccount, loginUser };

