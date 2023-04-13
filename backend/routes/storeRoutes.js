import express from "express";
import { createStore, updateStore, getStoreById, getStores } from "../controllers/storeController.js";
import { protect, owner } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').post(protect, createStore).get(getStores)
router.route('/:id').put(protect, owner, updateStore).get(getStoreById)

export default router