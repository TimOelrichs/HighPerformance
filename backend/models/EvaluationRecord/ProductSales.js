require('../dbConnect');

var ProductSalesSchema = new Schema({
    productName: String,
    clientName: String,
    clientRating: String,
    items: Number,
    bonus: Number,
    remarks: String
});

module.exports = ProductSalesSchema;