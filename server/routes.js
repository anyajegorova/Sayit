const User = require('./models/User');
const Notepost = require('./models/Notepost');

const moment = require('moment');
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
            res.status(200).json({
                message: 'Login successful',
                email: user.email,
                id: user._id,
                token
            });
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
        const { username, email, password } = req.body;
        console.log(username, email, password)
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
        const formattedNoteposts = noteposts.map((notepost) => ({
            name: notepost.name,
            date: moment(notepost.date).format('Do [of] MMMM YYYY'),
            content: notepost.content,
            ownerEmail: notepost.owner.email
        }));
        res.status(200).json(formattedNoteposts);
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
            date: moment(notepost.date).format('Do [of] MMMM YYYY'),
            content: notepost.content,
            ownerEmail: notepost.owner.email
        }));
        res.status(200).json(formattedNoteposts);
    } catch (error) {
        console.error(error)
    }

})

//Get user info

router.post('/profile', async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId)
        res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
        console.error(error)
    }

})

//Change password

router.post('/change_password', async (req, res) => {
    const { userId, oldPassword, newPassword, newPasswordConfirmation } = req.body;
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

//Toggle favourite notepost
router.post('/toggle_favourite', async (req, res) => {
    try {

        const { userId, notepostId } = req.body;
        const user = await User.findById(userId);
        const isFavourite = user.favourites.includes(notepostId);

        if (isFavourite) {
            user.favourites.pull(notepostId);
        } else {
            user.favourites.push(notepostId)
        }


        await user.save();
        res.status(200).json({ message: 'Favourite updated successfully' });

    } catch (error) {
        console.error(error)
    }
});

// //Get favourite noteposts
// router.post('/favourites', async (req, res) => {
//     try {
//         const { userId } = req.body;
//         console.log('userID', userId)
//         const user = await User.findById(userId).populate('favourites');
//         console.log('User', user)
//         const formattedNoteposts = user.favourites.map((notepost) => ({
//             name: notepost.name,
//             date: moment(notepost.date).format('Do [of] MMMM YYYY'),
//             content: notepost.content,
//             ownerEmail: notepost.owner.email
//         }));
//         if (formattedNoteposts.length === 0) {
//             return res.status(200).json({ message: 'No favourite noteposts' });
//             console.log('formattedNoteposts', formattedNoteposts);
//         }
        
//         res.status(200).json(formattedNoteposts);
//         console.log('FORMATTED NOTEPOSTS ',formattedNoteposts)
//     } catch (error) {
//         console.error(error)
//     }
// });

module.exports = router;