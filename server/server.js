const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./router');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

dotenv.config();
const app = express();
const db = mongoose.connection;
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;
const path = require('path');

const allowedOrigins = [
    'https://sayit-el0l.onrender.com',
    'https://sayit-api.onrender.com',
    'http://localhost:5173',
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
app.use(helmet());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', router);

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'Database connection error:'));

db.once('open', () => {
    console.log('Database connection successful');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
