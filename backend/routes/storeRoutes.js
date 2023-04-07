import express from "express";
import { createStore, updateStore } from "../controllers/storeController.js";
import { protect, owner } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').post(protect, createStore)
router.route('/:id').put(protect, owner, updateStore)

export default router