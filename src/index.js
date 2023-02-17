import './css/styles.css';
import { restCountriesAPI } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    let nameCountry = event.target.value.trim();
    console.log(nameCountry);

    if (nameCountry === "") {
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";

        return;
    };

    restCountriesAPI(nameCountry)
    .then(data => {
        console.log(data)
        checking(data);
    })
    .catch(error => createError());
};



function checking(list) {

    if (list.length > 10) {
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";

        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (list.length >= 2 && list.length <= 10) {
        countryInfo.innerHTML = "";
        createMarkupList(list);
    } else {
        countryList.innerHTML = "";
        createMarkupOneCountry(list);
    }
};



function createMarkupList(listCountries) {
    const markupCountries = listCountries.map(country => 
        `<p><img src="${country.flags.svg}" width="32" alt="${country.name}"> ${country.name}</p>`
    ).join('');

    countryList.innerHTML = markupCountries;
};

function createMarkupOneCountry(infoCountry) {
    const markupCountry = infoCountry.map(country => 
        `<li>
            <h1><img src="${country.flags.svg}" width="70" alt="${country.name}"> ${country.name}</h1>
            <h4>Capital: ${country.capital}</h4>
            <h4>Population: ${country.population}</h4>
            <h4>Languages: ${country.languages}</h4>
        </li>`
    ).join('');

    countryInfo.innerHTML = markupCountry;
};



function createError() {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";

    Notiflix.Notify.failure("Oops, there is no country with that name");
};



countryList.style.fontSize = "32px";
countryList.style.fontWeight = "700";

countryInfo.style.fontSize = "32px";
countryInfo.style.fontWeight = "700";
countryInfo.style.listStyle = "none";