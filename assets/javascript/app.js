
      // Initial array of animals
      var animals = ["Cat", "Poodles", "Horse", "Bird"];

      // displayanimalInfo function re-renders the HTML to display the appropriate content
      function displayAnimalInfo() {

       // var animal = $(this).attr("data-name");
       // var queryURL = "https://www.omdbapi.com/?t=" + animal + "&y=&plot=short&apikey=trilogy";
// -- new code:
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=nL69goaRlIH40cpVtwF61UO5rxvKVOA3&limit=10";
// -- end new code

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        
        // After data comes back from the request
        .then(function(response) {
           // console.log(queryURL);
  
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
  
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
  
              // Creating and storing a div tag
              var animalDiv = $("<div>");
  
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);
  
              // Creating and storing an image tag
              var animalImage = $("<img>");
              // Setting the src attribute of the image to a property pulled off the result item
              //animalImage.attr("src", results[i].images.fixed_height.url);
              animalImage.attr({src: results[i].images.fixed_height_still.url, "data-still":results[i].images.fixed_height_still.url,
              "data-animate":results[i].images.fixed_height.url, "data-state":"still", class:"gif"});
              //<img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
              console.log(animalImage);
              // Appending the paragraph and image tag to the animalDiv
              animalDiv.append(p);
              animalDiv.append(animalImage);

          // Putting the entire animal above the previous animals
          $("#animals-view").prepend(animalDiv);

//---------------------------------test

          console.log("is the document ready");
          $(".gif").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            console.log("class = gif")
            var state = $(this).attr("data-state");
            console.log(state)
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
//---------------------------------test

        }
        
    });

  }

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)

          var a = $("<button>");
          // Adding a class of animal-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a animal button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });
      
     
    

      // Adding a click event listener to all elements with a class of "animal-btn"
      $(document).on("click", ".animal-btn", displayAnimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      
    
 

 