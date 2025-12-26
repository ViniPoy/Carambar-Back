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