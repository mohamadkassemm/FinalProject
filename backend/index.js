const express = require('express');
const app = express();
const DB = require("./database").connectDB;

DB();

app.use(express.json());

const anyUserRouter = require('./routers/anyUserRoute');
const getUniversities = require('./routers/getUniversitiesRoute');

app.use('/universities', getUniversities);

app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
});



