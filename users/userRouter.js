const express = require('express');
const users = request('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
   // do your magic!
   return (req, res, next) => {
     users.getById(req.params.id)
      .then((user) => {
         if(user) {
            req.user = user
            next()
        }
      })
          // Do we need the else error statement or will the Router Error 
          //Handler in index.js display? 
          // else {
          // res.status(404).json({
          //   message: 'User Not Found.',
          // })
        }
    }

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    users.get(req.params)
      .then((user) => {
          if(user) {
            req.user = user
             next()
      } 
    })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    users.getUserPosts(req.params.userId)
      .then((post) => {
        if(post) {
          res.json(post)
        }
      })
    }
}

module.exports = router;
