const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/new-item-create', upload.single('image'), function (req, res) {
  console.log(req.file);
  if (req.file) {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      image: req.file.filename,
    });
    newItem.save();
  } else {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });
    newItem.save();
  }
  res.redirect('/');
});

module.exports = router;
