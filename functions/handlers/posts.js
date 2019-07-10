const { db } = require('../util/admin');
const{ admin } = require('../util/admin');

exports.getAllPosts = (req, res) => {
    admin.
        firestore()
        .collection('posts')
        .orderBy('created_at', 'desc')
        .get()
        .then(data => {
            let posts = []
            data.forEach(doc => {
                posts.push({
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    created_at: doc.data().created_at
                });
            });
            return res.json(posts)
        })
        .catch(err => console.error(err));
}

exports.postOnePost = (req,res) => {
    if(req.body.body.trim() === ''){
        return res.status(400).json({body: 'Body must not be empty'});
    }

    const newPost = {
        body: req.body.body,
        userHandle: req.user.handle,
        created_at: new Date().toISOString()
    };

    console.log("Before firestore", JSON.stringify(newPost.body))
    db
        .collection('posts')
        .add(newPost)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: "Something went wrong"})
            console.log(err)
        })
}