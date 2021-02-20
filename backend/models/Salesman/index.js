require('../dbConnect');

var SalesmanSchema = new Schema({
    fullName: String,
    firstName: String,
    middleName: String,
    lastName: String,
    employeeId: Number,
    department: String,
    jobTitle: String,
    imgUrl: String
});

exports.model = mongoose.model('Salesman', SalesmanSchema);

exports.SalesmanSchema = SalesmanSchema
