const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 64 },
  description: { type: String, required: true, minLength: 8, maxLength: 256 },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
  image: { type: String, default: 'no-image.png' },
});

ItemSchema.virtual('url').get(function () {
  return '/store/' + this._id;
});

module.exports = mongoose.model('Items', ItemSchema);
