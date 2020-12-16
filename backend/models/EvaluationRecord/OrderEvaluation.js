require('../dbConnect');
var productSalesSchema = require('./ProductSales')

var OrderEvaluationSchema = new Schema({
    HooverClean: [productSalesSchema],
    HooverGo: [productSalesSchema]
});

module.exports = OrderEvaluationSchema;