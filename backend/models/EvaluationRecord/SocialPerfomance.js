require('../dbConnect');

var EvaluationCriterionSchema = new Schema({
    goalDescription: String,
    targetValue: Number,
    actualValue: Number,
    remarks: String
});

module.exports = EvaluationCriterionSchema