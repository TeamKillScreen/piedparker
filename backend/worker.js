// listen to firebase for adds
// if we see an add, set car parks

var eyes = require("eyes");
var Firebase = require("Firebase");
var ParkingService = require("./ParkingService");

var firebaseUrl = "https://piedparker.firebaseio.com/locations/";
var rootRef = new Firebase(firebaseUrl);

var parkingService = new ParkingService();

rootRef.on("child_added", function(snapshot, prevChildKey){
  var locationVal = snapshot.val();
  var location = locationVal.location;

  parkingService.getParkingStats(location)
    .then(function (data) {
      if (data.length) {
        eyes.inspect(data);
        
        snapshot.ref().child("parking").set(data, function (error) {
          if (error) {
            eyes.inspect(error);          
          }
        });
      }
    })
    .catch(function (error) {
      console.dir(error);
    });
});
