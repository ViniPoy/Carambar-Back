const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

/**
 * @swagger
 * /api/blagues:
 *   post:
 *     summary: Ajouter une blague
 *     responses:
 *       201:
 *         description: Blague créée
 */
router.post('/', jokeController.createJoke);
/**
 * @swagger
 * /api/blagues:
 *   get:
 *     summary: Liste toutes le blagues
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/', jokeController.getAllJokes);
/**
 * @swagger
 * /api/blagues/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     description: Renvoie une blague au hasard depuis la base de données
 *     responses:
 *       200:
 *         description: Succès - Renvoie une blague.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/random', jokeController.getRandomJoke);
/**
 * @swagger
 * /api/blagues/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Blague non trouvée
 */
router.get('/:id', jokeController.getJokeById);

module.exports = router;