require('../dbConnect');

var SalesmanSchema = new Schema({
    fullName: String,
    employeeId: Number,
    orangeHRMId: Number,
    department: String,
    jobTitle: String,
    imgUrl: String
});

exports.Salesman = mongoose.model('Salesman', SalesmanSchema);

exports.SalesmanSchema = SalesmanSchema
