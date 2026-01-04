const { Sequelize } = require('sequelize');
const Joke = require('../models/jokeModel');

exports.createJoke = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newJoke = await Joke.create({ question, answer });
        res.status(201).json(newJoke);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création", error: error.message });
    }
};

exports.getAllJokes = async (req, res) => {
    try {
        const jokes = await Joke.findAll();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJokeById = async (req, res) => {
    try {
        const joke = await Joke.findByPk(req.params.id);
        if (!joke) return res.status(404).json({ message: "Blague non trouvée !" });
        res.json(joke);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRandomJoke = async (req, res) => {
    try {
        const joke = await Joke.findOne({ order: [Sequelize.fn('RANDOM')] }); // Utilisation de la fonction SQL RANDOM via Sequelize pour optimiser la performance.
        res.json(joke);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};