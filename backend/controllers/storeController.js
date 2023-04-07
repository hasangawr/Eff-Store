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

export { createStore }