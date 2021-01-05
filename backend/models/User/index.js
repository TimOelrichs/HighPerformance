require('../dbConnect');

var UserSchema = new Schema({
    userId: String,
    fullName: String,
    password: String,
    role: String
});

exports.model = mongoose.model('User', UserSchema);

