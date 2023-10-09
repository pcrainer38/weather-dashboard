var dateDisplayEl = document.querySelector('#currentDay');
var inputGroupEl = document.querySelector('.input-group')
var currWeatherEl = document.querySelector('#current-weather');
var fiveDayEl = document.querySelector('.five-day');
var searchBtnEl = document.querySelector('.btn');

// Cedar Park
var lat = 30.266666;
var lon = -97.733330;
var apiKey = 'b25ce75b259c4e61caf9ce00a1f90876';

function displayDate() {
    var today = dayjs().format('MMMM D, YYYY');
    // dateDisplayEl.text(today);
    console.log(today);
}


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
    console.log(wxQueryUrl);

    fetch(wxQueryUrl)
        .then (function (response) {

            if (!response.ok) {
                throw response.json();
            } else {

            return response.json();
        }
    })
        .then(function (data) {
            currWeatherEl.textContent = data.search.query;

            console.log(data);

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




searchBtnEl.addEventListener('click', handleSearchFormSubmit);
displayDate();


