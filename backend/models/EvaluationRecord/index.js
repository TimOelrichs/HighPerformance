require('../dbConnect');
var SocialPerformanceSchema = require("./SocialPerfomance")
var { SalesmanSchema } = require('../Salesman')
var OrderEvaluationSchema = require("./OrderEvaluation");

var EvaluationRecordSchema = new Schema({
    salesman: SalesmanSchema,
    year: Number,
    sales: OrderEvaluationSchema,
    totalBonusA: Number,
    socialPerformances: [SocialPerformanceSchema],
    totalBonusB: Number,
    totalBonus: Number,
    remarks: String,
    status: String,
});

var EvaluationRecord = mongoose.model('EvaluationRecord', EvaluationRecordSchema);

module.exports = EvaluationRecord