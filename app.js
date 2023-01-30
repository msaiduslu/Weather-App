const input = document.getElementById("input");
const btn = document.querySelector(".submit");
const div = document.querySelector(".mainrow");

let itemList = JSON.parse(localStorage.getItem("weather")) || [];

window.addEventListener("load",()=>{
  createItems(); 
})

const getWeather = async (cityName) => {
  const API_KEY = "1d9e5adcad5de15797fca3e54136f073";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    console.log(data);
    addWeather(data);
  } catch (error) {
    renderError(error);
  }
};

function renderError(error) {
  alert(error);
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    alert("Please enter city!!!");
    return;
  }
  getWeather(input.value);
  input.value=""
  
});

const addWeather = (data) => {
  const { description, icon } = data.weather[0];
  const { speed: windSpeed, deg } = data.wind;
  const { humidity, temp, temp_max, temp_min } = data.main;
  const { name: city } = data;
  const items = {
    city: city,
    temperature: temp,
    max_temp: temp_max,
    min_temp: temp_min,
    weather: description,
    img: icon,
    wind: windSpeed,
    direction: deg,
    humidity: humidity,
  };
  itemList.push(items);
  localStorage.setItem(`weather`, JSON.stringify(itemList));
  createItems();
};

function createItems() {
  div.innerHTML = "";
  itemList.forEach((item) => {
    console.log(item);
    div.innerHTML += `
    <div class="col mb-2">
    <div class="card h-100 text-center align-items-center justify">
      <img src="http://openweathermap.org/img/wn/${item.img}.png" class="card-img-top w-50 " alt="">
      <div class="card-body justify-content-center">
        <h5 class="card-title">${item.city}</h5>
        <p class="card-text"> Weather Status : ${item.weather}</p>
        <p class="card-text"> Temparature : ${item.temperature} °C</p>
        <p class="card-text"> Max Temperature : ${item.max_temp} °C</p>
        <p class="card-text"> Min Temperature : ${item.min_temp} °C</p>
        <p class="card-text"> Wind Speed : ${item.wind}</p>
        <p class="card-text"> Humidity : ${item.humidity}</p>
      </div>
    </div>
  </div>
    `;
  });
}
