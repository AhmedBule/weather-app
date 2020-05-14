// Here we run our AJAX call to the OpenWeatherMap API

var APIKey = "b17c321e09f505d0c59f40f8ee7903cf"
 var previousSearch = JSON.parse(localStorage.getItem("previouscities")) || []
// var previousSearch = localStorage.getItem("cityName")
function displayLocalstorage (){
  console.log(previousSearch)
  for (let i = 0; i < previousSearch.length; i++) {
    $("#citySearch").append(`<button class = "cityDisplay"> ${previousSearch[i]}</button>`)
  }
};  
displayLocalstorage()

$("#getweather").on("click", function(){
  var cityname = $("#searchterm").val()
  console.log(cityname);
  getcurrentweather(cityname);
  get5dayforcast(cityname);
  previousSearch.push(cityname)
  window.localStorage.setItem('previouscities', JSON.stringify(previousSearch))
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
    $(".city").text(response.name + " Weather Details");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $("#imgtag").attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`);

    $(".temp").text("Temperature: " + response.main.temp);

    // Thereafter, we have to save the data in our local storage. 
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
  
     let myCityName = window.localStorage.getItem("cityName")

     $('#citySearch').html('<div>' +myCityName + '</div>');

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

    $("#uvindex").text("uvindex: " + response.value);
   
});
}

function get5dayforcast(cityname) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIKey}&units=imperial`         // We neeed the URL to query the database


$.ajax({                                
    url: queryURL,
    method: "GET"
  })

  
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    console.log("get5dayforcast", response)
    var fivedayforcast = $("<div/>")

    var container = $("<div class='row mt-3'/>");
    // $(container).attr("class", "col-sm-2")
    // container.setAttribute("class", "col-sm-2")

    var forcast = $("<p/>");
    var humidity = $("<p/>");
    // var uvIndex = $("<p/>");
    var temperature = $("<p/>");

    // create four more variables that represent the tags within the HTMl
    //At the end of the loop, append everything to var container

    for (var i = 0; i < response.list.length; i=i+8) {
      console.log("fivedayforcasttemp", response.list[i].main.temp);

      // forcast.innerHTML = "Forcast = " + response.list[i].main.forcast

      // container.append(forcast);

     // $("<div>" + "<p>" + "Temperature " + response.list[i].main.temp + "</p>" +  "<p>" + "Humidity " + response.list[i].main.humidity + "</p>" + "</div>")
      
      container.append(
        `<div class='col mr-3' style='background-color: blue; color: white'> 
        <p>Temperature: ${response.list[i].main.temp} </p>
        <img src = "https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png" />
        
        <p> ${response.list[i].dt_txt.split(" ")[0]} </p> 
        
        <p>Humidity ${response.list[i].main.humidity}</p>

        </div>
        `
      );
  
    };

    $("#dataFromPromise").html(container);
    console.log(container);
    // $("<div>" + "<p>" + "Temperature " + response.list[i].main.temp + "</p>" +  "<p>" + "Humidity " + response.list[i].main.humidity + "</p>" + "</div>")
  });
    //console.log("fivedayforcasttemp", response.list[0].main.temp);
   // console.log("fivedayforcasthumidity", response.list[0].main.humidity);
}

