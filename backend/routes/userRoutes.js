import express from "express";
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, getStoresByUserId } from "../controllers/userController.js";
import { protect, admin, owner } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/stores').get(protect, getStoresByUserId)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router