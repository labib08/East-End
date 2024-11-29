import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { userModel } from "../models/model.js";
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false, message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success:false, message: "Incorrect Password"});
        }
        const token = createToken(user._id);
        res.json({success:true, token});
    }
    catch (err) {
        console.log(err);
        res.json({success:false, message: "Server error"});
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const createAccount = async(req, res) => {
    const {name, password, email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: "User already exists"});
        }
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if (password.length < 3) {
            return res.json({success: false, message: "Please enter a strong password"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel ({
            name: name,
            email: email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.json({success:true, message: "User registered successfully"});
    }
    catch (err) {
        console.log(err);
        res.json({success:false, message: "Error creating account"})
    }
}
export { createAccount, loginUser };

