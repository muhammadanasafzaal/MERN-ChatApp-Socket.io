import User from "../../models/user.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../../utils/generateToken.js"

const signup = async (req, res) => {
    const { username, gender, fullName } = req.body
    try {
        if(!username || !fullName || !req.body.password || !gender) return res.status(400).json({ message: "Missing fields" });
        
        const user = await User.findOne({username});
        if(user) return res.status(400).json({ message: "user already exist" });

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt);

        const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            ...req.body,
            password,
            profilePic: gender == 'male' ? boyAvatar : girlAvatar
        })
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            
            await newUser.save()
            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } 
        else {
            res.status(400).json({ message:"Invalid user data" })
        }
    } catch (error) {
        res.status(500).json({ error:error.message })
    }
}

export default signup