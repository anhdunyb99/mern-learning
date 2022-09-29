const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Post = require('../models/Posts')

// route post/api
// create post

router.post('/',verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    //simple vadilation
    if (!title)
        return res.status(400).json({ success: false, message: 'Title is missing' })

    try {
        const newPost = new Post({ title,
            description,
            url: (url.startsWith('https://')) ? url : `https://${url}`, 
            status: status || 'TO LEARN', 
            user: '63219fa97d7de1e4e919f2df' })

        await newPost.save()
        res.json({ success: true, message: 'Happy learning',post : newPost })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})
// update posts 
router.put('/:id',verifyToken,async (req,res) => {
    const { title, description, url, status } = req.body
    
    if (!title)
        return res.status(400).json({ success: false, message: 'Title is missing' })

    try {
        let updatePost = {
            title,
            description : description || '',
            url : (url.startsWith('https://') ? url : `https://${url}`) || '',
            status : status || 'TO LEARN' 

        }
        const condition = {
            _id : req.params.id,
            user : req.userId
        }

        updatePost = await Post.findOneAndUpdate(condition,updatePost,{new : true})
        
        // user not authorized
        if(!updatePost){
            return res.status(400).json({ success: false, message: 'Post not found' })
        }
        res.json({ success: true, message: 'PUT SUCCES',post : updatePost })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
    
})

// delete
router.delete('/:id',verifyToken, async(req,res) => {
    try {
        const postDeleteCondition = {
            _id : req.params.id,
            user : req.userId
        }
        deletePost = await Post.findOneAndDelete(postDeleteCondition)
        // user not authorized
        if(!deletePost){
            return res.status(401).json({ success: false, message: 'user not authorize' })
        }
        res.json({ success: true, message: 'PUT SUCCES',post : deletePost })
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})
module.exports = router