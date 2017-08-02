var config = {
    apiKey: "AIzaSyAfVaTD-YZ1Y-aDkagMJAMQcV18CsT_Imk",
    authDomain: "train-activity-54f96.firebaseapp.com",
    databaseURL: "https://train-activity-54f96.firebaseio.com",
    projectId: "train-activity-54f96",
    storageBucket: "train-activity-54f96.appspot.com",
    messagingSenderId: "646541121570"
  };
  firebase.initializeApp(config);

  database = firebase.database();
var next;
var left;
$(document).on("click","#info-submit", function(event){
	event.preventDefault();

	var trainName = $("#input-train-name").val().trim();
	var destination = $("#input-destination").val().trim();
	var frequency = $("#input-frequency").val().trim();
	var firstTrain = $("#input-time").val().trim();

	var train_format = moment(firstTrain).subtract(1,"years");
	console.log(train_format);

	var currentTime = moment();
	console.log("current time: " + moment(currentTime).format("hh:mm"));

	var diffTime = moment().diff(moment(train_format),"minutes");
	console.log("difference in time: " + diffTime);

	var remainder = diffTime % frequency; 
	console.log(remainder);

	left = frequency - remainder;
	console.log("minutes till train: " + left);

	next = moment().add(left, "minutes");
	console.log("arrival time" + moment(next).format("hh:mm"));

	var newTrain = {
		name: trainName,
		destination: destination,
		frequency: frequency,
		firstTrain: firstTrain

	}

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.frequency);
	console.log(newTrain.firstTrain);

	alert("Your Train Has been Added!")

	database.ref().push(newTrain);

	trainName = $("#input-train-name").val("");
	destination = $("#input-destination").val("");
	frequency = $("#input-frequency").val("");
	firstTrain = $("#input-time").val("");
});


	database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var frequency = childSnapshot.val().frequency;
	var next = moment(next).format("hh:mm");

	console.log(trainName);
	console.log(destination);
	console.log(frequency);

	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + left + "</td><tr>");

});

	

