const User = require('./models/User');
const Notepost = require('./models/Notepost');
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();

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
            res.status(200).json({ message: 'Login successful', email: user.email, id: user._id });
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

// Get all noteposts

router.get('/noteposts', async (req, res) => {
    try {
        const noteposts = await Notepost.find();
        res.status(200).json({ noteposts });
    } catch (error) {
        console.error(error)
    }
}
)

module.exports = router;