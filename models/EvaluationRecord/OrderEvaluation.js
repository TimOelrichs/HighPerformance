require('../dbConnect');
var productSalesSchema = require('./ProductSales')

var OrderEvaluationSchema = new Schema({
    productName: String,
    productSales: [productSalesSchema]
});

module.exports = OrderEvaluationSchema;