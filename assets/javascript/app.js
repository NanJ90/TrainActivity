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

	var train_format = moment(firstTrain, "hh:mm").subtract(1,"years").format("X");
	console.log(train_format);

	var currentTime = moment();
	console.log("current time: " + moment(currentTime).format("X"));

	var diffTime = moment().diff(moment.unix(train_format),"minutes");
	console.log("difference in time: " + diffTime);

	var remainder = diffTime % frequency; 
	console.log(remainder);

	left = frequency - remainder;
	console.log("minutes till train: " + left);

	next = moment().add(left, "minutes");
	next =  moment(next).format("hh:mm");
	console.log("arrival time" + moment(next).format("hh:mm"));


	alert("Your Train Has been Added!")


	$("#input-train-name").val("");
	$("#input-destination").val("");
	$("#input-frequency").val("");
	$("#input-time").val("");

	var newTrain = {
		name: trainName,
		destination: destination,
		frequency: frequency,
		train_format:train_format
	}
		database.ref().push(newTrain);

});


	database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var frequency = childSnapshot.val().frequency;
	var train_format = childSnapshot.val().train_format;
	var diffTime = moment().diff(moment.unix(train_format),"minutes");
	var remainder = diffTime % frequency; 
		left = frequency - remainder;
		next = moment().add(left, "minutes");
		next =  moment(next).format("hh:mm");


	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + " mm </td><td>" + next + "</td><td>" + left + " mm </td><tr>");

});

	

