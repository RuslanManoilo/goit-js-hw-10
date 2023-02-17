function restCountriesAPI(nameCountry) {
    const BASE_URL = `https://restcountries.com/v2/name/${nameCountry}?fields=name,capital,population,languages,flags`;

    return fetch(BASE_URL).then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
};

export { restCountriesAPI };