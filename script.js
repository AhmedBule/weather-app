// Here we run our AJAX call to the OpenWeatherMap API

var APIKey = "b17c321e09f505d0c59f40f8ee7903cf"

var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + APIKey;         // We neeed the URL to query the database

$.ajax({                                // before we get into the API and storing it in our local storage, we will call the AJAX from OpenWeatherMap API
    url: queryURL,
    method: "GET"
  })

  
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".uv-index").text("UV Index: " + response.uv.index);

    // Next, we need to add the temperature to html. In this case, we will use the fahrenheight. 
    $(".temopture (F) " + tempF.toFixed(1));

    // Thereafter, we have to save the data in our local storage. 
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
       console.log("UV Index: " + response.uv.index);
        console.log("Temperature (F): " + tempF);

  });