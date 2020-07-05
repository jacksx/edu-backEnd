var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/edu');
var Schema = mongoose.Schema;

var advertSchema = new Schema({
    title:  { type: String, required: true },
    image:  { type: String, required: true },
    link:  { type: String, required: true },
    start_time:  { type: Date, required: true },
    end_time:  { type: Date, required: true },
    create_time: { type: Date, default: Date.now },
    last_modified: { type: Date, default: Date.now },
});

var Advert = mongoose.model('Advert', advertSchema);




export default Advert