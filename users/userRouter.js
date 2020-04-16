const express = require('express');
const users = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  users.insert(req.body) 
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })  
});

router.post('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts) 
    })
    .catch((error) => {
      next(error)
    })
  });

router.get('/', validateUser(), (req, res) => {
  // do your magic!
  users.get(req.params.id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.getById(req.params.id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error)
    })
  });

router.get('/:id/posts/:userId', validatePost(), validatePost(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id, req.params.userId) 
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id) 
    .then((user) => {
      res.status(200).json({
        message: 'User has been removed.',
      })
    })
    .catch((error) => {
      next(error)
    })
});

router.put('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body) 
    .then((user) => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Unable to Update User.",
     })
    }) 
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
          // Do we need the else error statement or will the Router Error 
          //Handler in index.js display? 
          else {
          res.status(404).json({
            message: 'Invalid User Id',
          })
        }  
     })    
        .catch((error) => {
           next(error)
          })
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
      } else {
        res.status(404).json({
          message: 'Missing User Data',
        })
      }  
    })
      .catch((error) => {
        next(error)
       })
     }
  }


function validatePost() {
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
        next(error)
       })
     }
   }



module.exports = router;
