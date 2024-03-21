const dotenv = require('dotenv');
const Topic = require('../models/Topic');

dotenv.config();

//Create topic

const createTopic = async (req, res) => {
    const userId = req.user.id;
    try {
        const topic = req.body;
        const newTopic = new Topic({
            name: topic.topic,
            creator: userId
        });
        const topicSaved = await newTopic.save();
        res.status(201).json({ message: 'Topic created successfully', topicSaved });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
};

//Get all topics

const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.status(200).json(topics);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
};

//Get general topic id 

const getGeneralTopicId = async (req, res) => {
    try {
        const generalTopic = await Topic.findOne({ name: 'General' });
        res.status(200).json(generalTopic._id);
    } catch (error) {
        console.error('Error getting general topic', error)
        res.status(500).json({ message: 'Server error' })
    }
};


module.exports = {
    createTopic,
    getAllTopics,
    getGeneralTopicId
};