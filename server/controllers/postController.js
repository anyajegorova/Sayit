const dotenv = require('dotenv');

const Notepost = require('../models/Notepost');
const User = require('../models/User');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

dotenv.config();

//Create post

const createPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { content, topic } = req.body;
        const date = new Date();
        const newNotepost = new Notepost({
            date: date,
            content: content,
            owner: userId,
            likedBy: [],
            likeCount: 0,
            topic: topic
        });
        const notepostSaved = await newNotepost.save();
        res.status(201).json({ message: 'Notepost created successfully', notepostSaved });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}

// Get all user posts

const getAllUserPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteposts = await Notepost.find({ owner: userId });
        if (noteposts.length === 0) {
            return res.status(404).json({ message: 'No noteposts found' });
        }
        const userPromises = noteposts.map(async (notepost) => {
            await Notepost.populate(notepost, { path: 'owner', select: 'email username' });
        });
        await Promise.all(userPromises);
        const formattedNoteposts = noteposts.map((notepost) => ({
            date: moment(notepost.date).format('Do [of] MMMM YYYY'),
            content: notepost.content,
            ownerEmail: notepost.owner.email,
            username: notepost.owner.username,
            notepostId: notepost._id,
            likedBy: notepost.likedBy,
            likeCount: notepost.likeCount
        }));
        res.status(200).json(formattedNoteposts);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })

    }
}

// Get all posts

const getPublicPosts = async (req, res) => {
    try {
        const currentTopic = req.body.topic;
        const noteposts = await Notepost.find({ topic: currentTopic });
        // Creating array for storing promises for fetching user data using populate
        if (!noteposts) {
            return res.status(404).json({ message: 'No noteposts found' })
        }
        const userPromises = noteposts.map(async (notepost) => {
            await Notepost.populate(notepost, { path: 'owner', select: 'email username avatar' });
        });
        await Promise.all(userPromises);

        const formattedNoteposts = noteposts.map((notepost) => ({
            date: moment(notepost.date).format('Do [of] MMMM YYYY'),
            content: notepost.content,
            ownerEmail: notepost.owner.email,
            username: notepost.owner.username,
            avatar: notepost.owner.avatar,
            notepostId: notepost._id,
            likedBy: notepost.likedBy,
            likeCount: notepost.likeCount,
            topic: notepost.topic
        }));
        res.status(200).json(formattedNoteposts);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }

}

// Delete post

const deletePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { notepostId } = req.body;
        if (!notepostId) {
            return res.status(400).json({ message: 'No post id provided' });
        }

        const deletedNotepost = await Notepost.deleteOne({ owner: userId, _id: notepostId });
        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get user avatars for each post by username

const getUserAvatar = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username: username });

        if (!user || !user.avatar.data) {
            res.send(user.avatar.data)
        } else {
            const filePath = path.resolve(__dirname, '..', 'uploads', user.avatar.data);
            const avatarData = fs.readFileSync(filePath);
            res.setHeader('Content-Type', 'image/*');
            res.send(avatarData);
        }

    } catch (error) {
        console.error('Error fetching avatar', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Toggle like 

const toggleLike = async (req, res) => {
    const { notepostId } = req.body;
    const userId = req.user.id;
    try {
        const notepost = await Notepost.findById(notepostId);
        if (!notepost) {
            return res.status(404).json({ message: 'Notepost not found' });
        }
        if (notepost.likedBy.includes(userId)) {
            notepost.likedBy.pull(userId);
            notepost.likeCount--;
        } else {
            notepost.likedBy.push(userId);
            notepost.likeCount++;
        }
        await notepost.save();
        const updatedNotepost = await Notepost.findById(notepostId);
        res.status(200).json({
            message: 'Like toggled successfully',
            updatedNotepost,
        });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

//Get all user likes 

const getLikes = async (req, res) => {
    const userId = req.user.id;
    try {
        const noteposts = await Notepost.find({ likedBy: userId });
        console.log(noteposts)
        if (noteposts.length === 0) {
            return res.status(404).json({ message: 'No noteposts found' });
        }
        const userPromises = noteposts.map(async (notepost) => {
            await Notepost.populate(notepost, { path: 'owner', select: 'email username avatar' });
        });

        await Promise.all(userPromises);

        const formattedNoteposts = noteposts.map((notepost) => ({
            date: moment(notepost.date).format('Do [of] MMMM YYYY'),
            content: notepost.content,
            ownerEmail: notepost.owner.email,
            username: notepost.owner.username,
            avatar: notepost.owner.avatar,
            notepostId: notepost._id,
            likedBy: notepost.likedBy,
            likeCount: notepost.likeCount
        }));
        res.status(200).json(formattedNoteposts);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
};


module.exports = {
    createPost,
    getAllUserPosts,
    getPublicPosts,
    deletePost,
    getUserAvatar,
    toggleLike,
    getLikes,
}


