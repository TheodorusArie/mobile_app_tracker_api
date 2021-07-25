require('./models/Users');
require('./models/Tracks');


const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requiredAuth = require('./middlewares/requiredAuth');
const trackRoutes = require('./routes/trackRoutes');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:admin@cluster0.bihlh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
    console.log("CONNECTED TO MONGO DB");
})

mongoose.connection.on('error', (err) => {
    console.log("ERROR FROM MONGO DB:", err)
})


app.get('/', requiredAuth, (req, res) => {
    res.send(`your email:${req.user.email}`);
});

app.listen(3000, () => {
    console.log("LISTENING TO PORT 3000");
})