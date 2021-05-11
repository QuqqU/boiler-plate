const express = require('express')
const app = express()
const port = 3000

//const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { User } = require('./models/User')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello Worlwqweqwed!')
})

app.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) return res.json({
            loginSuccess: false,
            message: "no user who is adequate"
        })
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                loginSuccess: false,
                message: "wrong pw"
            })

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err)
                
                res.cookie('x_auth', user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id 
                    })
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})