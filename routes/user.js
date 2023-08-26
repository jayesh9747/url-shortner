const express = require('express');
const app = express();
const router = express.Router();
const { handleSignUp, handleSignIn } = require('../controllers/user');

router.post("/", handleSignUp);
router.post("/signin", handleSignIn);

module.exports = router;