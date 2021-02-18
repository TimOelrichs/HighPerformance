require('../dbConnect');
var productSalesSchema = require('./ProductSales')

var OrderEvaluationSchema = new Schema([productSalesSchema]);

module.exports = OrderEvaluationSchema;