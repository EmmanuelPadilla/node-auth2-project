const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const router = require("express").Router()

const Users = require("../users/users-model")
const {isInvalid} = require('../users/users-service')

const {jwtSecret} = require("./secrets")

router.post("/register", (req, res) =>{
    const credentials = req.body
    if (isInvalid(credentials)) {
        const round = process.env.BCRYPT_ROUNDS || 8
        const hash = bcrypt.hashSync(credentials.password, rounds)
        credentials.password = hash

        Users.add(credentials)
            .then(user=> {
                res.status(201).json({data:user})
            })
            .catch(error=> {
                res.status(500).json({message: error.message})
            })


    } else{
        res.status(400).json({ message: 'you forgot the password esse'})
    }
})

router.post('/login', (req, res) => {
    const {username, password } =req.body

    if(isValid(req.body)) {
        Users.findBy({ username: username})
            .then(([user]) => {
                if (user && bcrypt.compareSync(password, user.password)){
                    const token = makeToken(user)
                    res.status(200).json({ message: "welcome", token })
                } else {
                    res.status(401).json({message: "ಠ_ಠ invalid creds"})
                }
            })
    }
})

function makeToken(user) {
    const payload ={
        subject: user.id,
        username: user.username,
        role: user.role
    }
    const options = {
        expiresIn:'1 day'
    }
    return jwt.sign(payload, jwtSecret, options)
}




module.exports = router;