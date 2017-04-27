//call the packages needed
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
    mongoose.connect('mongodb://mzevitas:mzevitas@ds123331.mlab.com:23331/rest-api');


//-------------------------------------------------------------------
//Call Models here
//-------------------------------------------------------------------
// var adminUser = require('./app/models/admin-users');
var Events = require('./models/events');
// var Photos = require('./app/models/photos');


//-------------------------------------------------------------------
//configure app to use bodyParser(), Morgan
//-------------------------------------------------------------------

//log requests to the console
app.use(morgan('dev'));

//get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-------------------------------------------------------------------
//set port
//-------------------------------------------------------------------
var port = process.env.PORT || 8080;


//-------------------------------------------------------------------
//Routes for API
//-------------------------------------------------------------------

//get an instance of express router
var router = express.Router();

//middle to use for all request
router.use(function(req, res, next){
  //log something
  console.log('Something is happening.');
  //make sure we go to the next routes and don't stop there. Application would stop at this middleware without it.
  next();
});

//test route to make sure everthing is working
router.get('/', function(req, res){
  res.json({ message: 'Rest API is showing'});
});

// All Routes here

router.route('/events')

//Create an Event
.post(function(req, res){

  var event = new Events();
  event.eventDate = req.body.eventDate,
  event.venue = req.body.venue,
  event.startTime = req.body.startTime,
  event.endTime = req.body.endTime,
  event.ticketLink = req.body.ticketLink;

  event.save(function(err) {
    if(err)
      res.send(err);

    res.json({message: 'Event created!'});
  });

})

// get all the Events (accessed at GET http://localhost:8080/api/events)
    .get(function(req, res) {
        Events.find(function(err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

// Id of the Events

router.route('/events/:event_id')

//get an events with an id (accessed at GET http://localhost:8080/api/events/:event_id)
    .get(function(req, res){
        Events.findById(req.params.event_id, function(err, event){
          if (err)
            res.send(err);

            res.json(event);
        });
    })
//update the event using an id (accessed at PUT http://localhost:8080/api/events/:event_id)
    .put(function(req, res){
      //use event model to find the event wanted
      Events.findById(req.params.event_id, function(err, event){
        if (err)
            res.send(err);

          event.eventDate = req.body.eventDate,
          event.venue = req.body.venue,
          event.startTime = req.body.startTime,
          event.endTime = req.body.endTime,
          event.ticketLink = req.body.ticketLink;

          // Now save the event
          event.save(function(err){
            if(err)
              res.send(err);

            res.json({ message: 'Event updated!'});
          });
      });
    })

//delete the event using an id (accessed at DELETE http://localhost:8080/api/events/:event_id)
    .delete(function(req, res){
      Events.remove({
        _id: req.params.event_id
      }, function(err, event) {
          if(err)
            res.send(err);

          res.json({ message: 'This event has been deleted!'})
      });
    });



// Next route here


//----------------------------------------------------------------
//register routes
//----------------------------------------------------------------

// all routes will be prefixed /api
app.use('/api', router);

//----------------------------------------------------------------
//start the server
//----------------------------------------------------------------
app.listen(port);
console.log('Things are happening on port ' +  port);