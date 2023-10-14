import mongoose from 'mongoose';
import postMessage from '../models/postMessages.js'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await postMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const createPost = async (req, res) => {
    const data = req.body
    const newPost = postMessage({...data, creator: req.userId, createdAt: new Date().toString()})
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
    if(!req.userId) return res.status(404).json({message: 'unauthenticated'})
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with this id`)
        const post = await postMessage.findById(_id)
        const index = post.likes.findIndex((id) => id === String(req.userId))
        if(index === -1){
            // like post
            post.likes.push(req.userId)
        } else {
            //unlike post
            post.likes = post.likes.filter((id) => id !== String(req.userId)) 
        }
        const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {new: true})
        res.status(201).json(updatedPost)
}

export const getPost = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with this id`)
    try {
        const singlePost = await postMessage.findById(id)
        res.status(200).json(singlePost)
    } catch (error) {
        res.status(404).json({message: error})
    }
}