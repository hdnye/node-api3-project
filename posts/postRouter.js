const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  
function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    users.getUserPosts(req.params.userId)
      .then((post) => {
        if(post) {
          res.json(post)
          next()
        } else {
          res.status(404).json({
            message: 'User Not Found.',
          })
        }  
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "Could not get user"
        })
      }) 
    }
}
}

module.exports = router;
