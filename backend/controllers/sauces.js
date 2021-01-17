const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    console.log(req.body);
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    sauceObject.likes = 0;
    sauceObject.dislikes = 0;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => {
        return res.status(400).json({error});
    });
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => {
        return res.status(400).json({error});
    });
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({error}));
        })
    })
    .catch(error => res.status(500).json({ error }));
}

exports.findSauce =  (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
}

exports.findSauces = (req, res, next) => {
    Sauce.find()
    .then(things => res.status(200).json(things))
    .catch( error => res.status(400).json({error}));
}

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        if (sauce.usersDisliked.indexOf(req.body.userId) >= 0) {
            return res.status(400).json({ message: "Impossible d'aimer une sauce qui a été dislike." });
        }
        if (sauce.usersLiked.indexOf(req.body.userId) >= 0) {
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
            sauce.likes -= 1;
        } else {
            sauce.usersLiked.push(req.body.userId);
            sauce.likes += 1;
        }
        Sauce.updateOne({ _id: sauce._id }, sauce)
        .then(() => res.status(200).json({ message: 'Sauce liké'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.dislikeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        if (sauce.usersLiked.indexOf(req.body.userId) >= 0) {
            return res.status(400).json({ message: "Impossible de dislike une sauce qui a été liké." });
        }
        if (sauce.usersDisliked.indexOf(req.body.userId) >= 0) {
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1);
            sauce.dislikes -= 1;
        } else {
            sauce.usersDisliked.push(req.body.userId);
            sauce.dislikes += 1;
        }
        Sauce.updateOne({ _id: sauce._id }, sauce)
        .then(() => res.status(200).json({ message: 'Sauce disliké'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({ error }));
}