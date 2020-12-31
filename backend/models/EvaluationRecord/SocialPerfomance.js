require('../dbConnect');

var EvaluationCriterionSchema = new Schema({
    goalDescription: String,
    targetValue: Number,
    actualValue: Number,
    bonus: Number,
    remarks: String
});

module.exports = EvaluationCriterionSchema