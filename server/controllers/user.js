const User = require("../models/user")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
module.exports.signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        //find email
        if (!existingUser) {
            res.status(404).json({ message: "User doesn't exist" })
        }
        // Decrypt
        const bytes = CryptoJS.AES.decrypt(existingUser.password, process.env.PASS_SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        //compare password
        if (password !== originalPassword) {
            res.status(404).json({ message: "Password is incorrect" })
        }
        //create token
        const token = jwt.sign(
            {
                email: existingUser.email, id: existingUser._id
            }, process.env.TOKEN_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )
        // response success status
        res.status(200).json({ result: existingUser, token: token })

    } catch (error) {
        res.status(505).json({ message: error.message })
    }
}

module.exports.signup = async (req, res) => {
    const { email, password, confirmPassword, firstname, lastname } = req.body
    try {
        const existingUser = await User.findOne({ email })
        // user exists
        if (existingUser) {
            res.status(400).json({ message: "User already exists" })
        }
        // check password vs confirm password
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Password don't match" })
        }
        // hash password
        const hashedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SECRET_KEY).toString()
        //create user
        const user = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` })
        //create token
        const token = jwt.sign(
            {
                email: user.email, id: user._id
            }, process.env.TOKEN_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )
        // response success status
        res.status(200).json({ result: user, token: token })
    } catch (error) {
        res.status(505).json({ message: error.message })
    }
}