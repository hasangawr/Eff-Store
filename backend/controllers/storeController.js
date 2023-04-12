import asyncHandler from 'express-async-handler';
import Store from '../models/storeModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Fetch a store
// @route   GET /api/stores/:id
// @access  public
const getStoreById = asyncHandler(async (req, res) => {
    const store = await Store.findById(req.params.id)

    if (store) {
        if (store.products.length !== 0) {
            const productList = await Product.find({'_id': { $in : [...store.products]}})
            res.json({...store.toObject(), productList})
        } else {
            res.json(store)
        }
    } else {
        res.status(404)
        throw new Error('Store not found')
    }
})

// @desc    Create a store
// @route   POST /api/stores/
// @access  Private
const createStore = asyncHandler(async (req, res) => {
    const store = new Store({
        owner: req.user._id,
        name: 'Sample Store',
        type: 'Sample type',
        image: '/images/sample.png',
        description: 'Sample description',
        numReviews: 0,
    })

    const createdStore = await store.save()

    const user = await User.findById(req.user._id)
    user.isOwner = true
    user.stores.push(createdStore._id)
    const updatedUser = await user.save()

    res.status(201).json(createdStore)
})

// @desc    Update a store
// @route   PUT /api/stores/:id
// @access  Private/Owner
const updateStore = asyncHandler(async (req, res) => {
    const {name, type, image, description, numReviews} = req.body

    const store = await Store.findById(req.params.id)

    store.name = name
    store.type = type
    store.image = image
    store.description = description

    const updatedStore = await store.save()
    res.json(updatedStore)
})

export { createStore, updateStore, getStoreById }