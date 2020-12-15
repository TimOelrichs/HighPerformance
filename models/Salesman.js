require('./dbConnect');

var SalesmanSchema = new Schema({
    lastname: String,
    firstname: String,
    sid: Number
});

var Salesman = mongoose.model('Salesman', SalesmanSchema);

module.exports = Salesman