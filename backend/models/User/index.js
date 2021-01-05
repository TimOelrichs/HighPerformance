require('../dbConnect');

var UserSchema = new Schema({
    username: String,
    password: String,
    role: String
});

exports.model = mongoose.model('User', UserSchema);

