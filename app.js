//Homework solution line-by-line

//J-Query selector that runs this function once the entire page is ready to be manipulated
$(document).ready(function() {

    //Storing an array of animals into a variable called "animals"
      var animals = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
        "bird", "ferret", "turtle", "sugar glider", "chinchilla",
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
        "capybara", "teacup pig", "serval", "salamander", "frog"
      ];
    
      //Setting a function called "populateButtons" with parameters "arrayToUse", "classToAdd", and "areaToAddTo"
      function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      //Selecting parameter "areaToAddTo" and emptying it in when function populateButtons is called in order to clear the screen on each new button clicked
        $(areaToAddTo).empty();
    
      //Read arrayToUse which when the function is called, becomes the Animals array.
        for (var i = 0; i < arrayToUse.length; i++) {
      //Storing a jQuery button within var a
          var a = $("<button>");
      //Adding a class to the button called "classToAdd" (a function parameter)
          a.addClass(classToAdd);
      //Adding animal data to the button
          a.attr("data-type", arrayToUse[i]);
      //Append the animal type text to the button
          a.text(arrayToUse[i]);
      //Append the animal type button to the page
          $(areaToAddTo).append(a);
        }
    
      }
    
      //On click of the animal button, run this function
      $(document).on("click", ".animal-button", function() {
      //Select the animals div in the html, and empty it
        $("#animals").empty();
      //Select the animal button and remove the class
        $(".animal-button").removeClass("active");
    
        //"This" is the object that occurs when the button is clicked. When this button is clicked, we add a class of "active," which changes the background color of the button in our CSS.
        $(this).addClass("active");
    
        //The data-type value is being stored into var type
        var type = $(this).attr("data-type");
    
        // We store the Base URL + Type (the data-type attribute / the animal) + our API key into a new variable called queryURL.
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    
    
        //We are doing an AJAX call here
        $.ajax({
        //Giving the Ajax a place to make the call to, our queryURL/Giffy API as defined above in var queryURL
          url: queryURL,
        //Send a GET request in order to "hit" the API
          method: "GET"
        })
    
        //.then, once we've received our data, a function response occurs
          .then(function(response) {
            console.log(response);
        //Storing response.data in var results in order to make a shortcut to reference object data
            var results = response.data;
        //Read thru the results of the response
            for (var i = 0; i < results.length; i++) {
            //Creating a div for each of the results
              var animalDiv = $("<div class=\"animal-item\">");
            //Creating a varibale called rating using the results from the object
              var rating = results[i].rating;
            //Creating var p and setting this to be the text of the rating, and selecting the p tag with jQuery. It will be appended in steps below
              var p = $("<p>").text("Rating: " + rating);
            //Setting var animated to the gifs with a max height of 200
              var animated = results[i].images.fixed_height.url;
            //Setting var still to the stills with a fixed height still. These are still shots and unanimated.
              var still = results[i].images.fixed_height_still.url;
            //Selecting html image tag and setting this to var animalImage
              var animalImage = $("<img>");
            //Setting data attributes to the images we set variables for above. This will be referenced in below lines.
              animalImage.attr("src", still);
              animalImage.attr("data-still", still);
              animalImage.attr("data-animate", animated);
              animalImage.attr("data-state", "still");
            //Added class to animal-image
              animalImage.addClass("animal-image");
            //Appending the p tag to the animalDiv. This consists of our rating.
              animalDiv.append(p);
            //Append the animalImage to our animalDiv variable, which contains the data we set a few lines above
              animalDiv.append(animalImage);
            //Append the animalDiv variable to the actual "animals" div within the HTML.
              $("#animals").append(animalDiv);
            }
          });
      });
    
      //Use a jQuery selector to select the document and run a function on the click of the animal-image.
      $(document).on("click", ".animal-image", function() {
      //Setting a variable called "state" and return the value of attribute "data-state". This is allowing us to have a variable for the paused GIFs so we can play them in the steps ahead. 
        var state = $(this).attr("data-state");
    // If the state of the gif is still, then...
        if (state === "still") {
    //Add attributes to the paused still to replace with an src data of animated gif
          $(this).attr("src", $(this).attr("data-animate"));
    //Add attribute to replace the still data-state to animate.
          $(this).attr("data-state", "animate");
        }
    //Else, the image stays still. 
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    //Using a jQuery selector to select the add-animal input button. On click of add-animal, run this function with parameter "event"
      $("#add-animal").on("click", function(event) {
    //On this event, preventDefault, which means the default action of the event will not be triggered.
        event.preventDefault();
    //New var newAnimal is set to a jQuery selector that is selecting the HTML inputs. eq(0) is selecting the first index of the inputs and .val is selecting the value of the text box.
        var newAnimal = $("input").eq(0).val();
    //If newAnimal has more than 2 characters...
        if (newAnimal.length > 2) {
    //Push newAnimal to animals array
          animals.push(newAnimal);
        }
    //Run function populateButtons with the following arguments...
        populateButtons(animals, "animal-button", "#animal-buttons");
    
      });
    //Run function populateButtons with the following arguments...
      populateButtons(animals, "animal-button", "#animal-buttons");
    });
    