var dateDisplayEl = document.querySelector('#currentDay');
var inputGroupEl = document.querySelector('.input-group')
var currWeatherEl = document.querySelector('#current-weather');
var fiveDayEl = document.querySelector('.five-day');
var searchBtnEl = document.querySelector('.btn');

// austin
var lat = 30.266666;
var lon = -97.733330;
var apiKey = 'b25ce75b259c4e61caf9ce00a1f90876';



function handleSearchFormSubmit(event) {
    var searchInputVal = document.querySelector('.input-group').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    } else {
        console.log('Great choice!');
    }

    searchApi(searchInputVal);
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
           console.log(cityName);

           var today = dayjs().format('MMMM D, YYYY');

           // Current temperature, wind, humidity
           var temperature = data.list[0].main.temp; 
            temperature = Math.floor((temperature - 273) * 1.8 + 32);
            console.log(temperature);

            var wind = data.list[0].wind.speed;
            console.log(wind);

            var humidity = data.list[0].main.humidity;
            console.log(humidity);

            displayCurrentWeather(cityName, today, temperature);

            // 5 day forecast
            var temp = data.list[2].main.temp;
            temp = Math.floor((temp - 273) * 1.8 + 32);
            console.log(temp);
           

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

function displayCurrentWeather(city, date, temperature) {

    
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var forecast = document.createElement('div');
    // var weatherIcon = document.createElement('img');
    // var iconurl = 'https://openweathermap.org/img/w/${weather.weather[0].icon}.png'
    // weatherIcon.setAttribute('src', iconurl);
    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);
    heading.setAttribute('class', 'h2 card-title');
    heading.textContent = `${city} (${date})`;
    // heading.append(weatherIcon);
    cardBody.append(heading, temperature);
    currWeatherEl.innerHTML = '';
    currWeatherEl.append(card);
}



searchBtnEl.addEventListener('click', handleSearchFormSubmit);


