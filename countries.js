let page;
function getData(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((allCountries) => {
      allCountries.forEach((country) => {
        const countryDiv = makeCountry(country);
        const countryList = document.getElementById(`countryList`);
        countryList.appendChild(countryDiv);
      });
      eachCountryInfo();
    });
}

function makeHeader() {
  const where = document.createElement(`h1`);
  header.appendChild(where);
  where.textContent = `Where in the world?`;
  where.id = `where`;

  const darkMode = document.createElement(`a`);
  darkMode.id = `anchor`;
  header.appendChild(darkMode);
  darkMode.innerHTML = `<span class="fa fa-moon-o"></span>Dark Mode`;
}

function makeCountry(countryObj) {
  const countryDiv = document.createElement(`div`);
  countryDiv.className = `country`;
  countryDiv.id = `${countryObj.alpha2Code.toLowerCase()}`;
  const flag = document.createElement(`img`);
  countryDiv.appendChild(flag);
  flag.className = `flag`;
  flag.src = countryObj.flag;
  const countryInfo = document.createElement(`div`);
  countryInfo.className = `country-information`;
  countryDiv.appendChild(countryInfo);
  const countryNameElement = document.createElement(`h1`);
  countryInfo.appendChild(countryNameElement);
  countryNameElement.textContent = countryObj.name;
  countryNameElement.className = `countryName`;
  countryInfo.appendChild(
    getCountryInfoSentence(`Population`, countryObj.population)
  );
  countryInfo.appendChild(getCountryInfoSentence(`Region`, countryObj.region));
  countryInfo.appendChild(
    getCountryInfoSentence(`Capital`, countryObj.capital)
  );
  return countryDiv;
}

function search() {
  const searchDiv = document.createElement(`div`);
  searchDiv.id = `search`;
  const searchBar = document.createElement(`input`);
  const icon = document.createElement(`span`);
  icon.className = `fa fa-search form-control-feedback`;
  searchFilter.appendChild(searchDiv);
  searchDiv.appendChild(icon);
  searchDiv.appendChild(searchBar);
  searchBar.id = `searchBar`;
  searchBar.className = `form-control`;
  searchBar.setAttribute(`type`, `text`);
  searchBar.setAttribute(`placeholder`, `Search for a country...`);

  //search functionality
  searchBar.addEventListener(`keyup`, (x) => {
    let searchValue = x.target.value.toLowerCase();
    let countryDiv = document.getElementsByClassName(`country`);
    Array.from(countryDiv).forEach((element) => {
      let nameLowerCase = element.textContent.toLowerCase();
      if (nameLowerCase.indexOf(searchValue) != -1) {
        element.style.display = `initial`;
      } else {
        element.style.display = "none";
      }
    });
  });
}

function filterByRegion() {
  //make filter html
  const selectDiv = document.createElement(`div`);
  const select = document.createElement(`select`);
  searchFilter.appendChild(selectDiv);
  selectDiv.appendChild(select);
  selectDiv.id = `selectDiv`;
  select.id = `select`;
  select.appendChild(makeOption("Filter by Region"));
  select.appendChild(makeOption("Africa"));
  select.appendChild(makeOption("Americas"));
  select.appendChild(makeOption("Asia"));
  select.appendChild(makeOption("Europe"));
  select.appendChild(makeOption("Oceania"));

  //filter by regions
  let countries = document.getElementsByClassName(`country`);
  select.addEventListener(`change`, (option) => {
    let region = option.target.value;
    let countryDiv = Array.from(countries);
    countryDiv.map((x) => (x.style.display = `none`));
    getData(`http://restcountries.eu/rest/v2/region/${region}`);
  });
}

function makeOption(region) {
  let option = document.createElement(`option`);
  option.setAttribute(`value`, `${region}`);
  option.textContent = `${region}`;
  return option;
}

function getCountryInfoSentence(infoTitle, value) {
  const sentenceElement = document.createElement(`p`);
  sentenceElement.className = `countryPElement`;
  sentenceElement.innerHTML = `${infoTitle} : <span class = "value">${value}</spanDark>`;
  return sentenceElement;
}

function eachCountryInfo() {
  let countryDiv = document.getElementsByClassName(`country`);
  let navBar = document.getElementById(`searchFilter`);
  let countries = Array.from(countryDiv);
  countries.forEach((eachCountry) => {
    eachCountry.addEventListener(`click`, () => {
      fetch(`https://restcountries.eu/rest/v2/alpha/${eachCountry.id}`)
        .then((response) => response.json())
        .then((json) => {
          oneCountry(json);
        });
      countries.map((x) => {
        x.style.display = `none`;
      });
      navBar.style.display = `none`;
    });
  });
}

function oneCountry(json) {
  console.log(json);
  let oneCountryDiv = document.getElementById(`oneCountryInfo`);
  console.log(oneCountryDiv);
  //back button
  let backButtonDiv = document.createElement(`div`);
  oneCountryDiv.appendChild(backButtonDiv);
  backButtonDiv.id = `backDiv`;
  let backButton = document.createElement(`button`);
  backButtonDiv.appendChild(backButton);
  backButton.id = `back`;
  backButton.setAttribute(`type`, `button`);
  backButton.setAttribute(`onclick`, `window.location.href = "/"`);
  backButton.innerHTML = `<span class= "fa fa-arrow-left faArrow">  </span>  Back`;

  //flag and info and border countries div
  let infoDiv = document.createElement(`div`);
  oneCountryDiv.appendChild(infoDiv);
  infoDiv.id = `infoDiv`;

  //flag
  let flagDiv = document.createElement(`div`);
  infoDiv.appendChild(flagDiv);
  flagDiv.id = `flagDiv`;
  let flagImage = document.createElement(`img`);
  flagDiv.appendChild(flagImage);
  flagImage.src = json.flag;
  flagImage.id = `flagImg`

  //info and border countries div
  let infoNBorder = document.createElement(`div`);
  infoDiv.appendChild(infoNBorder);
  infoNBorder.id = `infoNBorder`;

  //information
  let informationDiv = document.createElement(`div`);
  informationDiv.id = `information`;

  let headerName = document.createElement(`div`);
  let countryName = document.createElement(`h1`);
  countryName.id = `countryNameHeader`;
  countryName.className = `countryName`;
  countryName.innerText = json.name;
  infoNBorder.appendChild(countryName);
  infoNBorder.appendChild(informationDiv);
  informationDiv.appendChild(headerName);

  informationDiv.appendChild(
    getCountryInfoSentence(`Native Name`, json.nativeName)
  );
  informationDiv.appendChild(
    getCountryInfoSentence(`Population`, json.population)
  );
  informationDiv.appendChild(getCountryInfoSentence(`Region`, json.region));
  informationDiv.appendChild(
    getCountryInfoSentence(`Sub Region`, json.subregion)
  );
  informationDiv.appendChild(getCountryInfoSentence(`Capital`, json.capital));
  informationDiv.appendChild(
    getCountryInfoSentence(`Top Level Domain`, json.topLevelDomain[0])
  );
  informationDiv.appendChild(
    getCountryInfoSentence(`Currencies`, json.currencies[0].name)
  );
  informationDiv.appendChild(
    getCountryInfoSentence(
      `Languages`,
      json.languages.map((x) => x.name)
    )
  );

  //border div
  let borderDiv = document.createElement(`div`);
  borderDiv.id = `borderDiv`;
  infoNBorder.appendChild(borderDiv);
  const borderPara = document.createElement(`p`);
  borderPara.className = `borderPara`;
  borderPara.innerHTML = `<span class="border">Border Countries</span> : <span class = "borderCountries">${json.borders}</span>`;
  borderDiv.appendChild(borderPara);
}


function lightMode(){
  
}

function onLoad() {
  getData(`https://restcountries.eu/rest/v2/all`);
  makeHeader();
  search();
  filterByRegion();
}

window.onload = onLoad;
