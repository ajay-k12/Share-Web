import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import user from '../models/user.js'
import 'dotenv/config'

export const signin = async (req, res) => {
    const {email, password} = req.body
    const SECRET = process.env.SECRET
    try {
        const existingAccount = await user.findOne({email})
        if(!existingAccount) return res.status(404).json({message: `user doesn't exist`})

        const bcryptPassword = await bcrypt.compare(password, existingAccount.password)

        if(!bcryptPassword) return res.status(404).json({message: 'invalid credentials'})

        const token = jwt.sign({email: existingAccount.email, id: existingAccount._id}, SECRET, {expiresIn: '5h'})

        res.status(200).json({result: existingAccount, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'something went wrong'})
    }

}

export const signup = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body
    const SECRET = process.env.SECRET
    try {
        const fullName = `${firstName} ${lastName}`
        const existingAccount = await user.findOne({email})
        if(existingAccount) return res.status(404).json({message: `user is already exist`})

        if(password !== confirmPassword) return res.status(404).json({messgae: `password doesn't match`})

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await user.create({email: email, password: hashedPassword, name: fullName})

        const token = jwt.sign({email: result.email, id: result._id}, SECRET, {expiresIn: '5h'})

        res.status(200).json({result: result, token: token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'something went wrong'})
    }
}