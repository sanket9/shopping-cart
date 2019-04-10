var mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
   },
   desc: {
        type: String,
        required: true
   },
   image_path: {
       type: String,
       required: true
   },
   price: {
       type: String,
       required: true
   },
   quantity: {
        type: Number,
        required: true,

   },
   active: {
        type: Boolean,
        default: true,
   }
});

const Product = module.exports = mongoose.model('Product', productSchema);