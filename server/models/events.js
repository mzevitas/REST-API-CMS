var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
    eventDate: {type: String, require: true }
   , venue: {type: String, require: true }
   , startTime: {type: String, require: true }
   , endTime: {type: String, require: true }
   , ticketLink: {type: String, require: true }
});

module.exports = mongoose.model('Events', eventsSchema);