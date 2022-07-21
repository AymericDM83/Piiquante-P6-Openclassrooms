// Importation modèle saue
const Sauce = require('../models/sauce');

// Fonction renvoyer toutes les sauces de la base de données
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

// Fonction renvoyer la sauce avec l'_id fourni
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

// // Fonction poster une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    // Création de la nouvelle instance du schéma Sauce
    const sauce = new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: '',
        usersDisliked: ''
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistré !" }))
        .catch(error => res.status(400).json({error}));
};

// // Fonction pour modifier une sauce
// exports.modifySauce = (req, res, next) => {

// };

// // Fonction pour supprimer une sauce
// exports.deleteSauce = (req, res, next) => {

// };

// // Fonction Like/dislike
// exports.likeAndDislikeSauces = (req, res, next) => {

// };