require('../dbConnect');
var SocialPerformanceSchema = require("./SocialPerfomance")
var productSalesSchema = require('./ProductSales')


var EvaluationRecordSchema = new Schema({
    employeeId: Number,
    year: Number,
    sales: [productSalesSchema],
    totalBonusA: Number,
    socialPerformances: [SocialPerformanceSchema],
    totalBonusB: Number,
    totalBonus: Number,
    remarks: String,
    status: String,
<<<<<<< HEAD
    releases: [String],
=======
    userFeedback: String,
    historie: [String],
    readBy: [],
>>>>>>> feature_userDB
});

var EvaluationRecord = mongoose.model('EvaluationRecord', EvaluationRecordSchema);

module.exports = EvaluationRecord