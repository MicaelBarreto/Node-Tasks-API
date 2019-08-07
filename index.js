const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/teste/:valor', (req, res, next) => {
    //res.status(200).send('My Backend! ')
    next()
})

app.get('/teste/:valor', (req, res, next) => {
    res.status(200).send('My Backend! =' + req)
    //next()
})

app.post('/teste/post', (req, res, next) => {
    res.status(200).send('My Backend! =' + req.body.name)
    //next()
})

app.listen(3000, () => {
    console.log('Executing')
})