import bcrypt from 'bcryptjs'
import User from "../../models/user.js"
import generateTokenAndSetCookie from '../../utils/generateToken.js'

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if(!username || !password) return res.status(400).json({ error: "Required username and password" });

        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({ error: "User not found" });

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword) return res.status(401).json({ error: "Invalid credentials" });

        const data = JSON.parse(JSON.stringify(user))
        delete data.password

        generateTokenAndSetCookie(user._id, res)
        res.status(201).json({ message:"Login successful", data: data })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default login