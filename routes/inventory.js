const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async function (req, res, next) {
  res.render('inventory', { items: await Item.find() });
});

router.get('/sortBy-:category', async function (req, res, next) {
  res.render('inventory', {
    items: await Item.find({ category: req.params.category }),
  });
});

router.get('/:id', async function (req, res, next) {
  res.render('item', {
    item: await Item.findById(req.params.id),
  });
});

router.delete('/:id', function (req, res) {
  Item.findByIdAndRemove(req.params.id).then(() => {
    res.redirect('/');
  });
});

module.exports = router;
