const User = require('./models/User');
const Notepost = require('./models/Notepost');

const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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
            return res.status(401).json({ message: 'Invalid email or password' });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ message: 'Login successful', email: user.email, id: user._id, token });
            console.log('Login here', user._id, user.email, token)
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
        const { email, password } = req.body;
        console.log(email, password)
        //Checking if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ message: 'Email already exists' });
        }

        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
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

// Add new notepost

router.post('/noteposts', async (req, res) => {
    try {
        const { userId, name, date, content } = req.body;
        if (name) {
            const newNotepost = new Notepost({
                name: name,
                date: date,
                content: content,
                owner: userId
            });
            const notepostSaved = await newNotepost.save();
            res.status(201).json({ message: 'Notepost created successfully', notepostSaved });
        } else {
            res.status(500).json({ message: 'Database error' });
        }
    } catch (error) {
        console.error(error)
    }
})

// Get all user noteposts

router.post('/all_noteposts', async (req, res) => {
    try {
        const { userId } = await req.body;
        const noteposts = await Notepost.find({ owner: userId });
        res.status(200).json(noteposts);
    } catch (error) {
        console.error(error)

    }
}
)

// Delete notepost

router.post('/delete_notepost', async (req, res) => {
    try {
        const { userId, name } = req.body;

        const deletedNotepost = await Notepost.deleteOne({ owner: userId, name: name });
        console.log('Deleted notepost', deletedNotepost)
        res.status(200).json({ message: 'Notepost deleted successfully' });

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

// Get all noteposts

router.get('/public_noteposts', async (req, res) => {
    try {
        const noteposts = await Notepost.find({});

        //Creating array for storing promises for fetching user data using populate
        const userPromises = noteposts.map(async (notepost) => { 
            await Notepost.populate(notepost, { path: 'owner', select: 'email' });
        });
        await Promise.all(userPromises);

        const formattedNoteposts = noteposts.map((notepost) => ({
            name: notepost.name,
            date: notepost.date,
            content: notepost.content,
            ownerEmail: notepost.owner.email
        }));
        console.log(formattedNoteposts)
        res.status(200).json(formattedNoteposts);
    } catch (error) {
        console.error(error)
    }

})

module.exports = router;