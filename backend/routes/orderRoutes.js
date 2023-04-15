import express from "express";
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered, getStoreOrders } from "../controllers/orderController.js";
import { protect, admin, owner } from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/stores/:id').get(protect, owner, getStoreOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').post(updateOrderToPaid)
router.route('/:orderId/deliver/:id').put(protect, owner, updateOrderToDelivered)

export default router