import asyncHandler from 'express-async-handler';
import Store from '../models/storeModel.js';

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
    res.status(201).json(createdStore)
})

// @desc    Update a store
// @route   PUT /api/stores/:id
// @access  Private
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

export { createStore, updateStore }