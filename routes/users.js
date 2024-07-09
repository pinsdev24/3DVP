const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Index - Liste des utilisateurs
router.get('/', async (req, res) => {
    const users = await User.find({});
    res.status(200)
    res.render('users/index', { users });
});

// Create - Formulaire d'ajout d'un utilisateur
router.get('/create', (req, res) => {
    res.render('users/create');
});

// Create - Ajouter un nouvel utilisateur
router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(302).redirect('/users');
});

// Edit - Formulaire de modification d'un utilisateur
router.get('/:id/edit', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user });
});

// Update - Modifier un utilisateur
router.put('/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(302)
    res.redirect('/users');
});

// Delete - Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
});

module.exports = router;
