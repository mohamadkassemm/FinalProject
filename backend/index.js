const express = require('express');
const app = express();
const DB = require("./database").connectDB;

DB();

app.use(express.json());

const userRoutes = require('./routers/anyUserRouter');
const studentRoutes = require('./routers/studentsRouter');
const universityRoutes = require('./routers/universitiesRouter');
const companyRoutes = require('./routers/companyRouter');
const courseRoutes = require('./routers/courseRouter');
const bootcampRoutes = require('./routers/bootcampRouter');
const eventRoutes = require('./routers/eventsRouter');
const jobRoutes = require('./routers/jobRouter');
const majorRoutes = require('./routers/majorRouter');

app.use('/', userRoutes);
app.use('/student', studentRoutes);
app.use('/universities', universityRoutes);
app.use('/company', companyRoutes);
app.use('/course', courseRoutes);
app.use('/job', jobRoutes);
app.use('/bootcamp', bootcampRoutes);
app.use('/event', eventRoutes);
app.use('/major/', majorRoutes);


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});