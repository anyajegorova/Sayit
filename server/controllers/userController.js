const dotenv = require('dotenv');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

dotenv.config();
const upload = multer();


//Get user info

const getUserInfo = async (req, res) => {
    const userId = req.user.id;
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ username: user.username, email: user.email, avatar: user.avatar });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }

};

//Set user avatar

const setUserAvatar = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileName = `avatar_${user.id}_${Date.now()}.png`;
        const filePath = path.resolve(__dirname, '..', '..', '/var/uploads', fileName);
        console.log(filePath)

        fs.writeFileSync(filePath, req.file.buffer);

        user.avatar = { data: fileName };
        await user.save();

        console.log('File path:', filePath);
        res.status(200).json({ message: 'Avatar uploaded successfully' });

    } catch (error) {
        console.error('Error uploading avatar', error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
};

//Fetching user avatar

const getUserAvatar = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (user.avatar.data === null) {
            return res.status(404).json({ message: 'No avatar found' })
        }
        if (!user || !user.avatar.data) {
            res.send(user.avatar.data)
        } else {
            const filePath = path.resolve(__dirname, '..','..', '/var/uploads', user.avatar.data);
            const avatarData = fs.readFileSync(filePath);
            res.setHeader('Content-Type', 'image/*');
            res.send(avatarData);
        }

    } catch (error) {
        console.error('Error fetching avatar', error);
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(req, 'req')
    }
};

module.exports = {
    getUserInfo,
    setUserAvatar,
    getUserAvatar
}
