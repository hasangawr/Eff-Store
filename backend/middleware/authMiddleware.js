import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import Store from "../models/storeModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = Jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

const owner = asyncHandler( async(req, res, next) => {
    const store = await Store.findById(req.params.id)

    if(store) {
        if(store.owner.equals(req.user._id)) {
            next()
        } else {
            res.status(401)
            throw new Error('Not authorized as the owner')
        }

    } else {
        res.status(404)
        throw new Error('Store not found')
    }
})

export { protect, admin, owner }