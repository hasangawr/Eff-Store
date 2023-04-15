import asyncHandler from 'express-async-handler';
import Store from '../models/storeModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Fetch a store
// @route   GET /api/stores/:id
// @access  public
const getStoreById = asyncHandler(async (req, res) => {
    const store = await Store.findById(req.params.id)

    let productList = []

    if (store) {
        if (store.products.length !== 0) {
            productList = await Product.find({'_id': { $in : [...store.products]}})
            res.json({...store.toObject(), productList})
        } else {
            res.json({...store.toObject(), productList})
        }
    } else {
        res.status(404)
        throw new Error('Store not found')
    }
})

// @desc    Fetch all stores
// @route   GET /api/stores
// @access  public
const getStores = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Store.count({...keyword})
    const stores = await Store.find({...keyword}).limit(pageSize).skip((page - 1) * pageSize)

    res.json({stores, page, pages: Math.ceil(count / pageSize)})
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

export { createStore, updateStore, getStoreById, getStores }