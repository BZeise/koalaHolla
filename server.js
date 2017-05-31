var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var pg = require( 'pg' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var port = process.env.PORT || 8080;

var config = {
  database: 'koala',
  host: 'localhost',
  port: 5432,
  max: 12
};

var pool = new pg.Pool( config );

// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/koalas', function( req, res ){
  // console.log( 'GET koalas route hit' );
  // //assemble object to send
  // var objectToSend={
  //   response: 'from GET koalas route'
  // }; //end objectToSend
  // //send info back to client
  // res.send( objectToSend );
  // get route
//app.get( '/images', function( req, res ){
  console.log( 'get hit to /images' );
  // connect to db
  pool.connect( function( err, connection, done ){
    if( err ){
      console.log( 'error conencting to db' );
      done();
      res.send( 'totally vomitsnotfartburst' );
    } // end Error
    else{
      console.log( 'connected to db' );
      var allKoalas = [];
      // create our query string
      // tell db to run query
      // hold results in variable
      var resultSet = connection.query( 'SELECT * from koalas' );
      resultSet.on( 'row', function( row ){
        // loop through result set and push each row into an array
        allKoalas.push( row );
      }); // end
      resultSet.on( 'end', function(){
        // close connection
        done();
        // send back data
        res.send( allKoalas );
      });
    } // end no error
  }); // end pool connect
}); // end /images get


// add koala
app.post( '/koalas', urlencodedParser, function( req, res ){
  console.log( 'POST koalas route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from POST koalas route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});

// add koala
app.put( '/koalas', urlencodedParser, function( req, res ){
  console.log( 'PUT koalas route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from PUT koalas route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});
