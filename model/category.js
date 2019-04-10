var mongoose = require('mongoose');


var categorySchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   active: {
        type: Boolean,
        default: true,
   }
});

const Category = module.exports = mongoose.model('Category', categorySchema);