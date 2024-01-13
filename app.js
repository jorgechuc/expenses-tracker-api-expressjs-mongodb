const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Se conectó a la base de datos.');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Se inició el servidor en el puerto ${port}`);
});