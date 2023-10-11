var dateDisplayEl = document.querySelector('#currentDay');
var inputGroupEl = document.querySelector('.input-group')
var currWeatherEl = document.querySelector('#current-weather');
var fiveDayEl = document.querySelector('.five-day');
var searchBtnEl = document.querySelector('.btn');

var apiKey = 'b25ce75b259c4e61caf9ce00a1f90876';

searchBtnEl.addEventListener('click', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
    var searchInputVal = document.querySelector('.input-group').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    } else {
        console.log('Great choice!');
    }

    searchCity(searchInputVal);
}

// Gets latitude and longitude of city entered in webpage
function searchCity(query) {
  
    var cityEl = document.querySelector('#location').value;
    // console.log(cityEl);

    fetch("https://geocode.maps.co/search?q=" + cityEl)
    .then (function (response) {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('NETWORK RESPONSE ERROR');
        }
    })
    .then(function(data) {
        console.log(data);
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        console.log(latitude);
        console.log(longitude);
        lat = latitude;
        lon = longitude;
        searchApi();

    })
    .catch(function (error) {
        //  console.error(error);
    });

}

function searchApi (query) {
    var wxQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=`;
    wxQueryUrl = wxQueryUrl.replace('{lat}', lat);
    wxQueryUrl = wxQueryUrl.replace('{lon}', lon);
    wxQueryUrl = wxQueryUrl + apiKey;

    fetch(wxQueryUrl)
        .then (function (response) {
            if (response.ok) {
            return response.json();
          } else {
            throw new Error('NETWORK RESPONSE ERROR');
          }
        })
        .then(function (data) {
            console.log(data);

            // City and date
           var cityName = data.city.name;

           var today = dayjs().format('MMMM D, YYYY');
           
           // Current temperature, wind, humidity
           var temperature = data.list[0].main.temp; 
            temperature = Math.floor((temperature - 273) * 1.8 + 32);
            
            var wind = data.list[0].wind.speed;

            var humidity = data.list[0].main.humidity;

            displayCurrentWeather(cityName, today, temperature, wind, humidity);
            
            // 5 day forecast
            var days = [3, 11, 20, 28, 36]
            for (var i = 0; i < days.length; i++) {
                
                var dayOfWeek = data.list[days[i]].dt_txt;
            
                console.log(dayOfWeek);

                var fiveDayTemp = data.list[i].main.temp_max;
                fiveDayTemp = Math.floor((fiveDayTemp - 273) * 1.8 + 32);
                // console.log(fiveDayTemp);
            
                var fiveDayWind = data.list[i].wind.speed;
                // console.log(fiveDayWind);

                var fiveDayHumidity = data.list[i].main.humidity;
             // console.log(fiveDayHumidity);
                displayFiveDay(dayOfWeek, fiveDayTemp, fiveDayWind, fiveDayHumidity);
        }
            

            if (!data.results.length) {
                console.log('No results found!');
                currWeatherEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                currWeatherEl.textContent = '';
                for (var i = 0; i < data.results.length; i++) {
                    printResults(data.results[i]);
                }
            }
        })

        .catch(function (error) {
        //  console.error(error);
        });

}

function displayCurrentWeather(city, date, temperature, wind, humidity) {

    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var temperatureEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    temperatureEl.setAttribute('class','card-content');
    temperatureEl.textContent = `Temp: ${temperature} F`;    
    windEl.setAttribute('class', 'card-content');
    windEl.textContent = `Wind: ${wind} mph`;
    humidityEl.setAttribute('class', 'card-content');
    humidityEl.textContent = `Humidity: ${humidity}%`;
    
    // var weatherIcon = document.createElement('img');
    // var iconurl = 'https://openweathermap.org/img/w/${weather.weather[0].icon}.png'
    // weatherIcon.setAttribute('src', iconurl);
    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);
    heading.setAttribute('class', 'h2 card-title');
    heading.textContent = `${city}  (${date})`;
    // heading.append(weatherIcon);
    cardBody.append(heading, temperatureEl, windEl, humidityEl);
    currWeatherEl.innerHTML = '';
    currWeatherEl.append(card);

}

function displayFiveDay (dayOfWeek, fiveDayTemp, fiveDayWind, fiveDayHumidity) {
    var cardMini = document.createElement('div');
    var cardMiniBody = document.createElement('div');
    cardMini.setAttribute('class', 'card');
    cardMiniBody.setAttribute('class', 'card-body');
    cardMini.append(cardMiniBody);

    var dayOfWeekEl = document.createElement('p');
    dayOfWeekEl.setAttribute('class', 'p miniCard-title');
    dayOfWeekEl.textContent = `${dayOfWeek}`;
    
    
    fiveDayEl.append(cardMini);

    var fiveDayTempEl = document.createElement('p');
    fiveDayTempEl.setAttribute('class', 'p miniCard-title');
    fiveDayTempEl.textContent = `Temp: ${fiveDayTemp} F`;
    
    var fiveDayWindEl = document.createElement('p');
    fiveDayWindEl.setAttribute('class', 'p miniCard-title');
    fiveDayWindEl.textContent = `Wind: ${fiveDayWind} mph`;

    var fiveDayHumidityEl = document.createElement('p');
    fiveDayHumidityEl.setAttribute('class', 'p miniCard-title');
    fiveDayHumidityEl.textContent = `Humidity: ${fiveDayHumidity}%`;

    cardMiniBody.append(dayOfWeekEl, fiveDayTempEl, fiveDayWindEl, fiveDayHumidityEl);
}






