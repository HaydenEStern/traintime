  var config = {
      apiKey: "AIzaSyCQbwT7D8fw3btfgCBsxcgp43Jvocxc5j0",
      authDomain: "sample-project-64b6d.firebaseapp.com",
      databaseURL: "https://sample-project-64b6d.firebaseio.com",
      projectId: "sample-project-64b6d",
      storageBucket: "sample-project-64b6d.appspot.com",
      messagingSenderId: "927887821971"
  };
  firebase.initializeApp(config);
  database = firebase.database();


  // button for adding train
  $("#add-train").on("click", function() {
      event.preventDefault();

      // grabs user input
      var trainName = $("#name").val().trim();
      var trainDestination = $("#destination").val().trim();
      var trainStart = moment($("#firsttrain").val().trim(), "HH:mm").format("X");
      var trainFrequency = $("#frequency").val().trim();
      //creates local "temporary object" for holding train data
      var newTrain = {
          name: trainName,
          destination: trainDestination,
          start: trainStart,
          frequency: trainFrequency
      };
      // uplaods train data to database (push to root)
      database.ref().push(newTrain);
      // logs everything to console
      console.log(newTrain);


      // clear out html values in text boxes
      $("#name").val("");
      $("#destination").val("");
      $("#firsttrain").val("");
      $("#frequency").val("");

  });
  // create firebase event for adding train to database and a row in HTML table
  // use event listener with child_added

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());

      // store everything into a variable
      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var trainFrequency = childSnapshot.val().frequency;
      var trainStart = childSnapshot.val().start;

      var trainStartConverted = moment(trainStart, "hh:mm").subtract(1, "years");
      console.log(trainStartConverted);
      // Current Time
      var currentTime = moment();
      console.log("Current Time: " + moment(currentTime).format("hh:mm"));

      var timeDiff = moment().diff(trainStartConverted);
      console.log("Time Diff: " + timeDiff);

      var timeRemainder = timeDiff % trainFrequency;

      var minutesAway = trainFrequency - timeRemainder;
      console.log(minutesAway);

      // Next Train
      var nextTrain = moment().add(minutesAway, "minutes");
      console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

      var arrivalTime = moment(nextTrain).format("hh:mm");
      // add each part to table

      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" +
          trainDestination + "</td><td>" + trainFrequency + "</td><td>" + arrivalTime +
          "</td><td>" + minutesAway + "</td></tr>");

  });

d3.select('body').on("mouseover", function() {

  	gradient();

  	function gradient() {
  	d3.select('body')
  	.transition()
  	.style("background-color", 'purple')
  	.duration(10000)
  	.on("end", function(){
  		d3.select('body')
  		.transition()
  		.style("background-color", 'orange')
  		.duration(10000)
  		.on("end", function(){
  		d3.select('body')
  		.transition()
  		.style("background-color", 'pink')
  		.duration(10000)
  		.on("end", function(){
  		gradient();
  		
  	});
  		
  	});

  	});
  }

});
