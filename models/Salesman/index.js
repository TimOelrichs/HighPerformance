require('../dbConnect');

var SalesmanSchema = new Schema({
    lastname: String,
    firstname: String,
    sid: Number,
    department: String,
});

exports.Salesman = mongoose.model('Salesman', SalesmanSchema);

exports.SalesmanSchema = SalesmanSchema
