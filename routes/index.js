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
  res.redirect('/inventory');
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
  res.redirect('/inventory');
});

router.post('/item-update-:id', upload.single('image'), function (req, res) {
  if (req.file) {
    Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        number_in_stock: req.body.number_in_stock,
        image: req.file.filename,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated Item : ', docs);
        }
      },
    );
  } else {
    Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        number_in_stock: req.body.number_in_stock,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated Item : ', docs);
        }
      },
    );
  }
  res.redirect('/inventory');
});

module.exports = router;
