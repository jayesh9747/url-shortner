const express = require('express');
const router = express.Router();
const { handleGenerateNewShortURL } = require('../controllers/url');
const { handleshowanalytics } = require('../controllers/url');

router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleshowanalytics);

module.exports = router;