require('./dbConnect');

var EvaluationRecordSchema = new Schema({
    goalId: Number,
    goalDescription: String,
    targetValue: Number,
    actualValue: Number,
    year: Number,
    sid: Number
});

var EvaluationRecord = mongoose.model('EvaluationRecord', EvaluationRecordSchema);

module.exports = EvaluationRecord