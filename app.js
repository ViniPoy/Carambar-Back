const express = require('express');
const sequelize = require('./config/database');
const Joke = require('./models/jokeModel');
const jokeRoutes = require('./routes/jokeRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require ('swagger-ui-express');

const app = express();

app.use(express.json());

sequelize.sync({ force: false })
    .then(() => {
        console.log('La base SQLite est prête !');
    })
    .catch((err) => {
        console.error('Erreur de synchro : ', err);
    });

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Carambar & Co API',
            version: '1.0.0',
            description: 'API de blagues Carambar pour la Wild Code School'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/blagues', jokeRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur https://localhost:${PORT}`);
});