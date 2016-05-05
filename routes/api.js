var bodyParser = require('body-parser');
var Post = require('../models/posts')

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    //get all posts by a user
    app.get('/api/posts', function(req, res) {
        
        Post.find({ username: req.params.uname }, function(err, posts) {
            if (err) throw err;
            
            res.send(posts);
        });
        
    });

    app.post('/api/post', function(req, res) {
        
        if (req.body.id) {
            Post.findByIdAndUpdate(req.body.id, { 
                user: req.body.user, 
                title: req.body.title, 
                desc: req.body.desc, 
                url: req.body.url, 
                slug: req.body.slug, 
                image: req.body.image, 
                private: req.body.private, 
                created_at: req.body.created_at, 
                updated_at: req.body.updated_at
            }, 
            function(err, post) {
                if (err) throw err;
                
                res.send('Success');
            });
        }
        
        else {
           
           var newPost = Post({
                user: req.body.user, 
                title: req.body.title, 
                desc: req.body.desc, 
                url: req.body.url, 
                slug: req.body.slug, 
                image: req.body.image, 
                private: req.body.private, 
                created_at: req.body.created_at, 
                updated_at: req.body.updated_at
           });
           newPost.save(function(err) {
               if (err) throw err;
               res.send('Success');
           });
            
        }
        
    });
    
    app.delete('/api/post', function(req, res) {
        
        Post.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err;
            res.send('Success');
        })
        
    });

}