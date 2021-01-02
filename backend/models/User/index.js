require('../dbConnect');

var UserSchema = new Schema({
    username: String,
    password: String
});

exports.model = mongoose.model('User', UserSchema);

