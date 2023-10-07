// var inputGroupEl = document.querySelector('.input-group')
var currWeatherEl = document.querySelector('#current-weather');
var fiveDayEl = document.querySelector('.five-day');
var searchBtnEl = document.querySelector('.btn');
var cardDataEl = document.querySelector('.card-1');
 
var lat = 30.266666;
var lon = 97.733330
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
    wxQueryUrl = wxQueryUrl.replace("{lat}", lat);
    wxQueryUrl = wxQueryUrl.replace('{lon}', lon);
    wxQueryUrl = wxQueryUrl + apiKey;
    console.log(wxQueryUrl);

}


searchBtnEl.addEventListener('click', handleSearchFormSubmit);