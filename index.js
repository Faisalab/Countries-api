//getting the required html tags to target
const countriesList = document.getElementById('countries'),
    flag = document.getElementById('flag'),
    capital = document.getElementById('capital'),
    region = document.getElementById('region'),
    population = document.getElementById('population'),
    language = document.getElementById('lang');

let countries;

// adding event listener to display the values for the specified country
countriesList.addEventListener('change', event => {
    displayCountry(event.target.value);
})


//Using a fetch api call to recieve the data 
fetch('https://restcountries.eu/rest/v2/all')
//Run the response through .json()
.then(res => res.json())
//use the data to create the country choices within the input
.then(data => initialize(data))
//handle any err
.catch(err => console.log('Error Occurred:', err))


//
function initialize(countriesData) {
    countries = countriesData;
    let options = '';
    //foreach loop to create an option for each country recieved and set the value as its alpha3code
    countries.forEach(country => {
        options += `<option value="${country.alpha3Code}">${country.name}</option>`
    });
    //set the innerHTML of the list
    countriesList.innerHTML = options;

    countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
    // test
    displayCountry(countriesList[countriesList.selectedIndex].value);
}

//create a function that takes in the alpha3code of the data of countries
function displayCountry(countryByAlpha3Code){
    //find the country alpha3code that matches the one passed in
    const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
    //test to see results
    // console.log(countryData);

    //assign various pieces of data to respective pieces of HTML
    flag.innerHTML = `<img src="${countryData.flag}" alt="Country flag">`
    capital.innerHTML = `Capital: ${countryData.capital}`
    region.innerHTML = `Region: ${countryData.subregion}`
    population.innerHTML = `Population: ${countryData.population.toLocaleString('en-US')}`
    lang.innerHTML = `Language: ${countryData.languages.map(l => `${l.name}`).join(', ')}`
}

