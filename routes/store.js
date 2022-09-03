const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async function (req, res, next) {
  res.render('store', { items: await Item.find() });
});

router.get('/sortBy-:category', async function (req, res, next) {
  res.render('store', {
    items: await Item.find({ category: req.params.category }),
  });
});

module.exports = router;
