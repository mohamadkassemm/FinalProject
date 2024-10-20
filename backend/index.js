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

app.use('/api/user', userRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/university', universityRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/bootcamp', bootcampRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/major/', majorRoutes);


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});