const express = require('express');
const app = express();
const cors = require('cors');
const DB = require("./database").connectDB;

require('dotenv').config();
DB();
app.use(cors(
    {origin: 'http://localhost:3002',  // Allow requests only from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    credentials: true 
    }
));

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

app.use(`/api/${process.env.API_VERSION}/user`, userRoutes);
app.use(`/api/${process.env.API_VERSION}/student`, studentRoutes);
app.use(`/api/${process.env.API_VERSION}/university`, universityRoutes);
app.use(`/api/${process.env.API_VERSION}/company`, companyRoutes);
app.use(`/api/${process.env.API_VERSION}/course`, courseRoutes);
app.use(`/api/${process.env.API_VERSION}/job`, jobRoutes);
app.use(`/api/${process.env.API_VERSION}/bootcamp`, bootcampRoutes);
app.use(`/api/${process.env.API_VERSION}/event`, eventRoutes);
app.use(`/api/${process.env.API_VERSION}/major/`, majorRoutes);


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});