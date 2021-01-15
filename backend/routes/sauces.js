const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

router.post('/', auth, saucesCtrl.createSauce);

router.put('/:id', auth, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.get('/:id', auth, saucesCtrl.findSauce);

router.get('/', auth, saucesCtrl.findSauces);

module.exports = router;