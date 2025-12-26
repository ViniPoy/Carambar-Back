const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.post('/', jokeController.createJoke);
router.get('/', jokeController.getAllJokes);
router.get('/random', jokeController.getRandomJoke);
router.get('/:id', jokeController.getJokeById);

module.exports = router;