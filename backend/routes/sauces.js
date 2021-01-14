const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

router.post('/', saucesCtrl.createSauce);

router.put('/:id', saucesCtrl.modifySauce);

router.delete('/:id', saucesCtrl.deleteSauce);

router.get('/:id', saucesCtrl.findSauce);

router.get('/', saucesCtrl.findSauces);

module.exports = router;