const express = require('express');
const app = express();
require('dotenv').config();
const routerB = require('./src/routes/bookRouter')
const routerU = require('./src/routes/userRouter')
const mongoose = require('mongoose');

// require all routers 

app.use(express.json()); 

app.use('/book',routerB)
app.use('/user',routerU)

app.get('/', (req, res) => {
    res.send(`<h1> I am from root </h1>`)
})

app.get('*', (req, res) => {
    res.send(`<h1> Enter right url </h1>`)
})


// Database connection 
const url = process.env.MONGO_URL;

mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    })
    .then(() => console.log('mongodb server connected...'))
    .catch(err => console.log(err))

// app.use('/user', userRouter)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`))