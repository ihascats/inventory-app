const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async function (req, res, next) {
  res.render('store', { items: await Item.find() });
});

module.exports = router;
