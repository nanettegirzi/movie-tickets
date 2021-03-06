//business end
var myMovie;

//pointer to reference specified Movie object. To have easy access to new release variable.
function getMovie(userMovie) {
  moviesArray.forEach(function(movie) {
    if (movie.movieName === userMovie) {
      myMovie = movie;
    };
  });
};

function Ticket(movieName, timeOfDay, userAge) {
  this.movieName = movieName;
  this.timeOfDay = timeOfDay;
  this.userAge = userAge;
  this.price = 0;
}

function Movie(movieName, newRelease) {
  this.movieName = movieName;
  this.newRelease = newRelease;
}

var moviesArray = [
  new Movie("The Shape of Water", true),
  new Movie("Lady Bird", true),
  new Movie("Star Wars: The Last Jedi", false),
  new Movie("Kung Fu Hustle", false),
  new Movie("Baby Driver", false),
  new Movie("Princess Bride", false)
];

//to check and see if all forms have been selected
function formCheck(movie, time, age) {
  if(movie == "none" || time == "none" || age == "none"){
    alert("Oops! Please check your selections again.");
    return false;
  }
  else {
    return true;
  }
}

//loop through moviesArray and fill Select form with each title
function fillMovieForm(moviesArray){
  var i = 0;
  moviesArray.forEach(function(movie){
    $("#movieName").append("<option>" + moviesArray[i].movieName + "</option>");
    i++;
  });
}

//check the .userAge property of an object. Add some amount to the .price property of that object, depending on the value of object.userAge
function calcPrice(ticket, movie) {

//look at userAge and adjust price accordingly
  if(ticket.userAge == "child"){
    ticket.price += 5;
  }
  else if (ticket.userAge == "adult"){
    ticket.price += 8;
  }
  else if (ticket.userAge == "senior"){
    ticket.price += 5;
  }

  //if the movie is a new release, add 3 to ticket price
  if(movie.newRelease == true){
    ticket.price += 3;
  }

  if(ticket.timeOfDay == "Evening") {
    ticket.price += 5;
  }
}



//front end
$(document).ready(function(){

  fillMovieForm(moviesArray);

  $("form#orderTicket").submit(function(event){
    event.preventDefault();

    var movieName = $("#movieName").val();
    var timeOfDay = $("#timeOfDay").val();
    var userAge = $("#userAge").val();

    //if any fields are not selected, alert user. Otherwise, display purchaseConfirmation div
    if (formCheck(movieName, timeOfDay, userAge) == true){
      $(".purchaseConfirmation").show();
    }
    else {
      $(".purchaseConfirmation").hide();
    };

    getMovie(movieName);
    //console.log(myMovie);

    var newTicket = new Ticket(movieName, timeOfDay, userAge);
    //console.log(newTicket);

    calcPrice(newTicket, myMovie);
    //console.log(newTicket);

    $("#confirmMovie").text(newTicket.movieName);
    $("#confirmTime").text(newTicket.timeOfDay);
    $("#confirmPrice").text(newTicket.price);

  })

})
