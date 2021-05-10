const express = require('express')
const app = express()
const port = 3000

const db = require('./config/db-config.json')

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${db.id}:${db.password}@cluster0.dj48u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})