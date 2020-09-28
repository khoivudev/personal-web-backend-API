const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv/config');

const express = require('express');
const http = require('http');


const apiFreeCodeCampRouter = require('./routes/api/freecodecamp_api');
const apiTodoTaskRouter = require('./routes/api/todotask');
const apiQuoteRouter = require('./routes/api/quote');
const apiProjectRouter = require('./routes/api/project');

const app = express()

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//API
app.use('/api/freecodecamp_api', apiFreeCodeCampRouter);
app.use('/api/todotask', apiTodoTaskRouter);
app.use('/api/quote', apiQuoteRouter);
app.use('/api/project',apiProjectRouter);


//Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("MongoDB Connected!"))
    .catch(err => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))