const tokenVerifyMiddleware = require('./middleware/tokenVerifyMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');
const topicController = require('./controllers/topicController');
const userController = require('./controllers/userController');


const express = require('express')
const router = express.Router();
const dotenv = require('dotenv');
const multer = require('multer');

const upload = multer();

dotenv.config();

//Auth routes

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.post('/change_password', tokenVerifyMiddleware, authController.changePassword);

//Post routes

router.post('/create_notepost', tokenVerifyMiddleware, postController.createPost);
router.post('/all_noteposts', tokenVerifyMiddleware, postController.getAllUserPosts);
router.post('/public_noteposts', postController.getPublicPosts);
router.post('/delete_notepost', tokenVerifyMiddleware, postController.deletePost);
router.post('/get_user_avatar', tokenVerifyMiddleware, postController.getUserAvatar);
router.post('/toggle_like/like', tokenVerifyMiddleware, postController.toggleLike);
router.post('/favourites', tokenVerifyMiddleware, postController.getLikes);

//Topic routes

router.post('/new_topic', tokenVerifyMiddleware, topicController.createTopic);
router.get('/topics', tokenVerifyMiddleware, topicController.getAllTopics);
router.get('/topics/general', topicController.getGeneralTopicId);

//User routes

router.post('/profile', tokenVerifyMiddleware, userController.getUserInfo);
router.post('/avatar', upload.single('avatar'), tokenVerifyMiddleware, userController.setUserAvatar);
router.get('/get_avatar', tokenVerifyMiddleware, userController.getUserAvatar);

module.exports = router;