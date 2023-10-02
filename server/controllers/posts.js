import mongoose from 'mongoose';
import postMessage from '../models/postMessages.js'

export const getPost = async (req, res) => {
    try {
        const postMessages = await postMessage.find()
        console.log(postMessage);
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const createPost = async (req, res) => {
    const data = req.body
    const newPost = postMessage(data)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error})
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with this id`)
    const updataedPost = await postMessage.findByIdAndUpdate(_id, post, {new: true})
    try {
        res.status(201).json(updataedPost)
    } catch (error) {
        res.status(409).json({message: error})
    }
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with this id to delete`)
    try {
        await postMessage.findByIdAndDelete(_id)
        res.json({message: 'post deleted successfully'})
    } catch (error) {
        res.status(409).json({message: error})
    }
}

export const likePost = async (req, res) => {
    const {id: _id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with this id`)
    try {
        const post = await postMessage.findById(_id)
        const updatedPost = await postMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount+1}, {new: true})
        res.status(201).json(updatedPost)
    } catch (error) {
        res.status(409).json({message: error})
    }
}