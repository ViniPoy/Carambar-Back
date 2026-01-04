const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Joke = require('./models/jokeModel');
const jokeRoutes = require('./routes/jokeRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require ('swagger-ui-express');

const app = express();

// Configuration du Middleware CORS pour autoriser les requêtes provenanty du Front-end
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const initialJokes = [
    { question: "Quelle est la femelle du hamster", answer: "L’Amsterdam !" },
    { question: "Que dit un oignon quand il se cogne ?", answer: "Aïe !" },
    { question: "Quel est l'animal le plus heureux ?", answer: "Le hibou, parce que sa femme est chouette !" },
    { question: "Pourquoi le football c'est rigolo ?", answer: "Parce que Thierry en rit !" },
    { question: "Quel est le sport le plus fruité ?", answer: "La boxe, parce que tu prends des pêches dans la poire et tu tombes dans les pommes !" },
    { question: "Que se fait un Schtroumpf quand il tombe ?", answer: "Un Bleu !" },
    { question: "Quel est le comble pour un marin ?", answer: "Avoir le nez qui coule !" },
    { question: "Qu'est ce que les enfants usent le plus à l'école ?", answer: "Le professeur !" },
    { question: "Quel est le sport le plus silencieux ?", answer: "Le para-chuuuut !" },
    { question: "Quel est le comble pour un joueur de bowling ?", answer: "C’est de perdre la boule !" }
];

// Initialisation de la base de données au démarrage du serveur
sequelize.sync({ force: false })
    .then(async () => {
        console.log('La base SQLite est prête !');
        // On vérifie que la table des blagues est vide (elle le sera forcément à cause de render, au dela de la première utilisation, car il remet le fichier database.sqlite à 0 en redémarrant)
        const count = await Joke.count();
        if (count === 0) {
            await Joke.bulkCreate(initialJokes); // On insère le tableau de blagues (en une seule requête SQL grâce à bulkCreate)
            console.log('Base de données initialisée avec succès !');
        }
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
                url: 'http://localhost:3000',
                description: 'Serveur local'
            },
            {
                url: 'https://carambar-back-ttdo.onrender.com',
                description: 'Serveur de production'
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