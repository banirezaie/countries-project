function getData(URL) {
    fetch(URL)
        .then((response) => response.json())
        .then((allCountries) => {
            console.log(allCountries[0]);
            allCountries.forEach((country) => {
                const countryDiv = makeCountry(country);
                const countryList = document.getElementById(`countryList`);
                countryList.appendChild(countryDiv);
            });
        });
}

function makeCountry(countryObj) {
    const countryDiv = document.createElement(`div`);
    countryDiv.className = `country`;
    const flag = document.createElement(`img`);
    countryDiv.appendChild(flag);
    flag.className = `flag`;
    flag.src = countryObj.flag;
    const countryInfo = document.createElement(`div`);
    countryDiv.appendChild(countryInfo);
    const countryNameElement = document.createElement(`h1`);
    countryInfo.appendChild(countryNameElement);
    countryNameElement.textContent = countryObj.name;
    countryNameElement.className = `countryName`;
    countryDiv.appendChild(
        getCountryInfoSentence(`Population`, countryObj.population)
    );
    countryDiv.appendChild(getCountryInfoSentence(`Region`, countryObj.region));
    countryDiv.appendChild(getCountryInfoSentence(`Capital`, countryObj.capital));
    return countryDiv;
}

function getCountryInfoSentence(infoTitle, value) {
    const sentenceElement = document.createElement(`p`);
    sentenceElement.innerHTML = `<b>${infoTitle}</b> : ${value}`;
    return sentenceElement;
}

function onLoad() {
    getData(`https://restcountries.eu/rest/v2/all`);
}

window.onload = onLoad;