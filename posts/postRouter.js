const express = require('express');
const posts = require('./postDb')
const router = express.Router();

router.get('/', validatePost(), (req, res) => {
  // do your magic!
  posts.get(req.body)
  .then((post) => {
    res.status(200).json(post);
  })
  .catch((error) => {
    next(error)
  })
});


router.get('/:id', validatePostId(), (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
    .then((posts) =>{
      res.json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', validatePostId(), (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
    .then((post) => {
      res.status(200).json({
        message: 'Post has been removed.',
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Unable to Delete Post.",
      })
    })
});

router.put('/:id',validatePost(), validatePostId(),  (req, res) => {
  // do your magic!
  posts.update(req.params.id, req.body)
    .then((post) => {
      console.log(post)
      res.status(200).json({
        message: 'Post has been updated.',
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Unable to Update Post.",
      })
    //  next(error)
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    posts.getById(req.params.id)
      .then((post) => {
        if(post) {
          res.json(post)
          next()
        } else {
          res.status(404).json({
            message: "User Post Not Found"
          })
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "Could not get post"
        })
      }) 
  }}
  
function validatePost() {
  // do your magic!
  return (req, res, next) => {
    posts.get(req.params)
      .then((post) => {
        if(post) {
          req.post = post
          next()
        } else {
          res.status(404).json({
            message: 'Posts Not Found.',
          })
        }  
      })
      .catch((error) => {
        next(error)
      }) 
    }
}


module.exports = router; 
