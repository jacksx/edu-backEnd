var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/edu');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
    creat_time: {
        type: Date,
        default: Date.now
    }

})

var User = mongoose.model('User', userSchema);

export default User