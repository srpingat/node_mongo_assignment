const mongoose = require('mongoose');

const mongoosePaginate =require('mongoose-paginate-v2')
var itemSchema = new mongoose.Schema({
    itemname : {
        type : String,
        required: true
    },
    price: {
        type: Number,
        required: true
        
    }
})

itemSchema.plugin(mongoosePaginate)

const Item = mongoose.model('item', itemSchema);
module.exports = Item;
