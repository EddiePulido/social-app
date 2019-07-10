const functions = require('firebase-functions');

const app = require('express')()

const { getAllPosts,postOnePost } = require('./handlers/posts');
const { signup, logi, uploadImage } = require('./handlers/users');


const FBAuth = require('./util/fbAuth');

//Posts routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost);

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', uploadImage);



exports.api = functions.https.onRequest(app);

