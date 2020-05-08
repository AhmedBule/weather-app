// Here we run our AJAX call to the OpenWeatherMap API

var APIKey = "b17c321e09f505d0c59f40f8ee7903cf"

$("#getweather").on("click", function(){
  var cityname = $("#searchterm").val()
  console.log(cityname);
  getcurrentweather(cityname);
  // getfivedayforcast(cityname)
})
  function getcurrentweather(cityname){

  

var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKey}&units=imperial`         // We neeed the URL to query the database


$.ajax({                                // before we get into the API and storing it in our local storage, we will call the AJAX from OpenWeatherMap API
    url: queryURL,
    method: "GET"
  })

  
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
    
    var lat = response.coord.lat

    var lon = response.coord.lon

    getuvIndex(lat, lon);

    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".imgtag").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`);

    $(".temp").text("Temperature: " + response.main.temp);

    // Thereafter, we have to save the data in our local storage. 
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
  
     

  });
}

function getuvIndex(lat,lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`         // We neeed the URL to query the database


$.ajax({                                
    url: queryURL,
    method: "GET"
  })

  
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    console.log(response)

    $(".uv-index").text("UV-Index: " + response.value);
  
});

function getfivedayforcast(cityname) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIKey}`         // We neeed the URL to query the database


$.ajax({                                
    url: queryURL,
    method: "GET"
  })

  
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    console.log(response)

  
  
});



}