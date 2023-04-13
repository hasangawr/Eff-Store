import express from "express";
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } from "../controllers/productController.js";
import { protect, admin, owner } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductById).post(protect, owner, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id/:productId').delete(protect, owner, deleteProduct).put(protect, owner, updateProduct)

export default router