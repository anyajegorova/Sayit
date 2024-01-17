const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();
const app = express();
const db = mongoose.connection;
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5173/register',
    'http://localhost:5173/login'
]
const corsOptions = {
    origin: allowedOrigins,
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/', routes)


mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'Database connection error:'));

db.once('open', () => {
    console.log('Database connection successful');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
