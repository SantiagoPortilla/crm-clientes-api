const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 5.50,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
})

ProductSchema.plugin(mongoosePaginate)

module.exports = model('Product', ProductSchema, "Products")