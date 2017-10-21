$(document).ready(function(){

	var trainData = new Firebase("https://jkulasingam-01-828b0.firebaseio.com/");

	$("#addTrain").on("click", function(){

		var nameTrain = $("#inputNameTrain").val().trim();
		var nameLine = $("#inputNameLine").val().trim();
		var destination = $("#inputDestination").val().trim();
		var firstArrivalTime = moment($("#inputFirstTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = $("#inputFrequency").val().trim();

		console.log(nameTrain);
		console.log(nameLine);
		console.log(destination);
		console.log(firstArrivalTime);
		console.log(frequencyInput);

		var newTrain = {
			name:  nameTrain,
			line: nameLine,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		trainData.push(newTrain);

		$("#trainNameInput").val("");
		$("#lineInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		return false;
	});

	trainData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		var firebaseName = childSnapshot.val().name;
		var firebaseLine = childSnapshot.val().line;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});