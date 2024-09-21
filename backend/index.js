const express = require('express');
const app = express();
const DB = require("./database").connectDB;

DB();

app.use(express.json());

const userRoutes = require('./routers/anyUserRoute');
const studentRoutes = require('./routers/studentsRouter');
const universityRoutes = require('./routers/universitiesRoutes');
const bootcampRoutes = require('./routes/bootcampRouter');
const eventRoutes = require('./routes/eventRouter');
const jobRoutes = require('./routes/jobRouter');
const majorRoutes = require('./routes/majorRouter');

app.use('/', userRoutes);
app.use('/universities', universityRoutes);
app.use('/student', studentRoutes);
app.use('/job', jobRoutes);
app.use('/bootcamp', bootcampRoutes);
app.use('/event', eventRoutes);
app.use('/major/', majorRoutes);


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});