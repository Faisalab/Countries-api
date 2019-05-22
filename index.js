const countriesList = document.getElementById('countries');
const flag = document.getElementById('flag');
const capital = document.getElementById('capital')
const region = document.getElementById('region');
const population = document.getElementById('population');
const language = document.getElementById('lang');
let countries;

// event listener
countriesList.addEventListener('change', event => {
    displayCountry(event.target.value);
})



fetch('https://restcountries.eu/rest/v2/all')
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log('Error Occurred:', err))



function initialize(countriesData) {
    countries = countriesData;
    let options = '';

    countries.forEach(country => {
        options += `<option value="${country.alpha3Code}">${country.name}</option>`
    });
    countriesList.innerHTML = options;

    countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
    // test
    displayCountry(countriesList[countriesList.selectedIndex].value);
}

function displayCountry(countryByAlpha3Code){
    const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);

    console.log(countryData);

    flag.innerHTML = `<img src="${countryData.flag}" alt="Country flag">`
    capital.innerHTML = `Capital: ${countryData.capital}`
    region.innerHTML = `Region: ${countryData.subregion}`
    population.innerHTML = `Population: ${countryData.population.toLocaleString('en-US')}`
    lang.innerHTML = `Language: ${countryData.languages.map(l => `${l.name}`).join(', ')}`
}

