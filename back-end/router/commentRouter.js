const express = require('express')
const Comment = require('../module/Comment')
commentRouter = express.Router()

commentRouter.get('/', async (req, res) => {
    try {
        const comment = await Comment.find();

        res.status(200).json({
            message: 'you get all comments ',
            data: comment
        })
    } catch (error) {
        res.status(500).json('server occourd')
    }
})

commentRouter.get('/:id', async function (req, res) {
    try {
        const id = req.parms.id
        const comment = await Comment.findById({ id: id })
        res.status(200).json({
            message: "you get conmment by id ",
            data: comment
        })
    } catch (error) {
        res.status(500).json('serser Error')
    }

    res.status(200).json({
        message: "",
        data: data
    })
})

commentRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        console.log(body)
        const comment = await Comment.create(body)
        res.status(200).json({
            message: "comment created",
            data: comment
        })
    } catch (error) {
        res.status(500).json('server Error ')
    }
})
module.exports = { commentRouter }