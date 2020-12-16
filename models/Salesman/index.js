require('../dbConnect');

var SalesmanSchema = new Schema({
    fullName: String,
    firstName: String,
    middleName: String,
    lastName: String,
    employeeId: Number,
    orangeHRMId: Number,
    openCRXId: String,
    department: String,
    jobTitle: String,
    imgUrl: String
});

exports.Salesman = mongoose.model('Salesman', SalesmanSchema);

exports.SalesmanSchema = SalesmanSchema
