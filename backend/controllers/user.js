import { User } from "../models/user.js";

export const createUser = async (req,res) => {
    try {
        const { username, password, items_owned, created_auctions } = req.body;
        if(!username || !password)
        {
            return res.status(400).json({error : "Username and password are required"})
        }
        const user = await User.create({username,password,items_owned,created_auctions})
        return res.status(201).json({user})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const loginUser = async (req,res) => {
    try {
        const user = await User.findOne({
            username : req.body.username,
            password : req.body.password
        })

        if(user)
        {
            console.log(user)
            return res.status(200).json({user,found:true})
        }

        return res.status(401).json({ message: "Invalid username or password", found: false });
        
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const changePassword = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id,{password : req.body.password})
        if(user)
        {
            return res.status(200).json({user,found:true})
        }
        return res.status(401).json({ message: "User not found", found: false });
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const addAuction = async (req,res) => {
    const userId = req.body.user_id; 
    const newAuctionId = req.body.auction_id 
    try {
        const user = await User.findByIdAndUpdate(userId,
            { $push: { created_auctions: newAuctionId } },
            { new: true, useFindAndModify: false }
        )
        return res.status(201).json({user})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const getAllAuctions = async (req,res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if(user)
        {
            return res.status(201).json(user.created_auctions)
        }
        return res.status(500).json({error : error.message})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const getUserInfo = async (req,res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if(user)
        {
            return res.status(201).json({user})
        }
        return res.status(500).json({error : error.message})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}