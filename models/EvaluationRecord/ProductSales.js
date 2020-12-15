require('../dbConnect');

var ProductSalesSchema = new Schema({
    clientName: String,
    clientRating: String,
    items: Number,
    bonus: Number,
    remarks: String
});

module.exports = ProductSalesSchema;