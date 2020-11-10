require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const authRouter = require('../auth-router.js')
const usersRouter = require('../../users/users-router.js')




const server = express()
server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())



server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)




server.get('/', (req, res) =>{
    res.send("the server is running")
})


module.exports=server