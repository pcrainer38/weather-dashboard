var inputGroupEl = document.querySelector('.input-group')

var apiKey = 'b25ce75b259c4e61caf9ce00a1f90876';

function handleSearchFormSubmit(event) {
    event.preventDefault();

    if (!inputGroupEl) {
        console.error('You need a search input value!');
        return;
    }
    
}