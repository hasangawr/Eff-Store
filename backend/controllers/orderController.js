import asyncHandler from 'express-async-handler';
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    let orderItemsSet = orderItems

    function groupBy(arr, property) {
        return arr.reduce(function(memo, x) {
            if (!memo[x[property]]) { memo[x[property]] = []; }
            memo[x[property]].push(x);
            return memo;
        }, {});
    }

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {

        const orderItemsByStore = groupBy(orderItems, "store")
        const numOfOrders = Object.keys(orderItemsByStore).length

        let newItemsPrice = Number(itemsPrice)
        let newTaxPrice = Number((taxPrice / numOfOrders)).toFixed(2)
        let newShippingPrice = Number((shippingPrice / numOfOrders)).toFixed(2)
        let newTotalPrice = Number(totalPrice)

        let createdOrders = []

        for (var prop in orderItemsByStore) {
            if (Object.prototype.hasOwnProperty.call(orderItemsByStore, prop)) {
                orderItemsSet = orderItemsByStore[prop]
            }

            newItemsPrice = Number(orderItemsSet.reduce((acc, item) => acc + item.qty*item.price, 0)).toFixed(2)
            newTotalPrice = Number(newItemsPrice) + Number(newTaxPrice) + Number(newShippingPrice)

            const order = new Order({
                orderItems: orderItemsSet,
                store: prop,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice: newItemsPrice,
                taxPrice: newTaxPrice,
                shippingPrice: newShippingPrice,
                totalPrice: newTotalPrice
            })

            createdOrders.push(await order.save())
        }

        res.status(201).json(createdOrders)
    }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update order to paid
// @route   POST /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        //order.paymentResult = {
        //    id: req.body.order_id,
        //    status: req.body.status,
        //    update_time: req.body.update_time,
        //    email_address: req.body.payer.email_address
        //}


        console.log(order)
        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update order to delivered
// @route   PUT /api/orders/:orderId/deliver/:id
// @access  Private/Owner
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

// @desc    Get store orders
// @route   GET /api/orders/stores/:id
// @access  Private/Owner
const getStoreOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ store: req.params.id })
    res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders/
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders, getStoreOrders }