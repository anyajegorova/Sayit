const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
const db = mongoose.connection;
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5173/register',
    'http://localhost:5173/login',
    'http://localhost:5173/noteposts',
    'http://localhost:5173/all_noteposts',
    'http://localhost:5173/public_noteposts',
    'http://localhost:5173/noteposts/delete_notepost',
    'http://localhost:5173/noteposts/favourites'
]
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', routes);

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'Database connection error:'));

db.once('open', () => {
    console.log('Database connection successful');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
