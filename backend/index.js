const express = require('express');
const app = express();
const DB = require("./database").connectDB;

DB();

app.use(express.json());

const userRoutes = require('./routers/anyUserRoute');
const universityRoutes = require('./routers/universitiesRoutes');

app.use('/', userRoutes);
app.use('/universities', universityRoutes);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
