const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

router.post('/', jokeController.createJoke);

module.exports = router;