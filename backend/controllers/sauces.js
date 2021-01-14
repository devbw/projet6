const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({error}));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.paramas.id }, { ...req.body, _id: req.params})
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({error}));
}

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.paramas.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({error}));
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