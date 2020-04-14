// code away!
// Imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const postRouter = require('./posts/postRouter');
const userRouter = require('./posts/userRouter');

const server = express();
const port = 5000;

//Middleware Chain
server.use(express.json());
server.use(cors());
server.use(morgan());

//Route Handlers
server.use('/posts', postRouter);
server.use('/users', userRouter);

//Route Error Handler
server.use((req, res) => {
    res.status(404).json({
        message: 'This route cannot be found',
    })
})
//Server Error Handler
server.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Request not found',
    })
})

server.listen(port, () => {
    console.log(`Server started at http:localhost:${port}`)
})