const express = require('express');
const sequelize = require('./config/database');
const Joke = require('./models/jokeModel');
const jokeRoutes = require('./routes/jokeRoutes');

const app = express();

app.use(express.json());

sequelize.sync({ force: false })
    .then(() => {
        console.log('La base SQLite est prête !');
    })
    .catch((err) => {
        console.error('Erreur de synchro : ', err);
    });

app.use('/api/blagues', jokeRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur https://localhost:${PORT}`);
});