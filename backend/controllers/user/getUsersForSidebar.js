import User from "../../models/user.js"

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedinUserId = req.user._id
        
        const allUsers = await User.find({ _id: { $ne: loggedinUserId } }).select("-password") //ne = not equal to this user //dont select password column
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default getUsersForSidebar