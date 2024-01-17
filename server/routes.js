const User = require('./models/User');
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();

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
            res.status(200).json({ message: 'Login successful', email: user.email });
        }


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
});

//Register

router.post('/register', async (req, res) => {
    console.log('received registration request')
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
        console.log(userSaved)

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

module.exports = router;