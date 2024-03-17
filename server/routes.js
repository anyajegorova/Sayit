const User = require('./models/User');
const Notepost = require('./models/Notepost');
const Topic = require('./models/Topic');
const tokenVerifyMiddleware = require('./middleware/tokenVerifyMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

const moment = require('moment');
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer();
const mongoose = require('mongoose');

dotenv.config();
//Login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        //Checking if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({
                message: 'Login successful',
                email: user.email,
                username: user.username,
                avatar: user.avatar,
                id: user._id,
                token
            });
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
});

//Logout 

router.post('/logout', async (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }

});

//Register

router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;
        //Checking if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ message: 'Email already exists' });
        }

        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        const userSaved = await newUser.save();
        if (userSaved) {
            res.status(201).json({ message: 'Registered successfully' });
        } else {
            res.status(500).json({ message: 'Database error' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

//Create notepost

router.post('/create_notepost', tokenVerifyMiddleware, async (req, res) => {
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
        console.error(error)
    }

})

// Get all user noteposts

router.post('/all_noteposts', tokenVerifyMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const noteposts = await Notepost.find({ owner: userId });
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

    }
}
)
// Get all noteposts

router.post('/public_noteposts', async (req, res) => {
    try {
        const currentTopic = req.body.topic;
        const noteposts = await Notepost.find({ topic: currentTopic});
        // Creating array for storing promises for fetching user data using populate
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
    }

})


// Delete notepost

router.post('/delete_notepost', tokenVerifyMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { notepostId } = req.body;

        const deletedNotepost = await Notepost.deleteOne({ owner: userId, _id: notepostId });
        res.status(200).json({ message: 'Notepost deleted successfully' });

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);



//Get user info

router.post('/profile', tokenVerifyMiddleware, async (req, res) => {
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
    }

})

//Set user avatar

router.post('/avatar', upload.single('avatar'), tokenVerifyMiddleware, async (req, res) => {
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
        const filePath = path.join(__dirname, 'uploads', fileName);

        fs.writeFileSync(filePath, req.file.buffer);

        user.avatar = { data: fileName };
        await user.save();


        res.status(200).json({ message: 'Avatar uploaded successfully' });

    } catch (error) {
        console.error('Error uploading avatar', error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
})

//Fetching user avatar

router.get('/get_avatar', tokenVerifyMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (user.avatar.data === null) {
            return res.status(404).json({ message: 'No avatar found' })
        }
        if (!user || !user.avatar.data) {
            res.send(user.avatar.data)
        } else {
            const filePath = path.join(__dirname, 'uploads', user.avatar.data);
            const avatarData = fs.readFileSync(filePath);
            res.setHeader('Content-Type', 'image/*');
            res.send(avatarData);
        }

    } catch (error) {
        console.error('Error fetching avatar', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Fetching user avatars by notepost owner 

router.post('/get_user_avatar', tokenVerifyMiddleware, async (req, res) => {
    const ownerEmail = req.body;
    try {
        const user = await User.findOne({ email: ownerEmail });

        if (!user || !user.avatar.data) {
            res.send(user.avatar.data)
        } else {
            const filePath = path.join(__dirname, 'uploads', user.avatar.data);
            const avatarData = fs.readFileSync(filePath);
            res.setHeader('Content-Type', 'image/*');
            res.send(avatarData);
        }

    } catch (error) {
        console.error('Error fetching avatar', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Change password

router.post('/change_password', tokenVerifyMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword, newPasswordConfirmation } = req.body;
    try {
        const user = await User.findById(userId);
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid old password' });
        }
        if (newPassword !== newPasswordConfirmation) {
            return res.status(401).json({ message: 'New passwords do not match' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword });
        res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error(error)
    }
});


//Toggle like 
router.post('/toggle_like/like', tokenVerifyMiddleware, async (req, res) => {
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
})

//Get all user likes 
router.post('/favourites', tokenVerifyMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const noteposts = await Notepost.find({ likedBy: userId });
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
    }
});

//Create topic

router.post('/new_topic', tokenVerifyMiddleware, async (req, res) => {
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
    }
});

//Get all topics

router.get('/topics', tokenVerifyMiddleware, async (req, res) => {
    try {
        const topics = await Topic.find();
        res.status(200).json(topics);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
});

//Get general topic id 
router.get('/topics/general', async (req, res) => {
    try {
        const generalTopic = await Topic.findOne({ name: 'General' });
        res.status(200).json(generalTopic._id);
    } catch (error) {
        console.error('Error getting general topic', error)
    }
});

module.exports = router;