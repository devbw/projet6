const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.post('/:id/like', auth, saucesCtrl.likeSauce);

router.post('/:id/dislike', auth, saucesCtrl.dislikeSauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.get('/:id', auth, saucesCtrl.findSauce);

router.get('/', auth, saucesCtrl.findSauces);


module.exports = router;