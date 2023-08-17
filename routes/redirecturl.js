const express = require('express');
const router = express.Router();
const {handleredirectURl} = require('../controllers/url')
router.get('/:ShortId',handleredirectURl);

module.exports= router;

