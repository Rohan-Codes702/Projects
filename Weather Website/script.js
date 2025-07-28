const searchbtn=document.getElementById("search");
const locationInput=document.getElementById("location");

searchbtn.addEventListener("click",()=>{

  const city=locationInput.value.trim();

  if(city===""){
    alert ("Enter City Name");
    return;
  }
  fetchWeather(city);
})

async function fetchWeather(city) {
const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}&country=IN`;
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'aafc80fb33msh126e03765d7e266p131c64jsnf2a513275fe2',
    'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
  }
};


  try {
    const response = await fetch(url, options);
    const data = await response.json();

console.log("Full API Response:", data); 


    if(!data.main){
      alert("City not found. Please try again.");
      return;
    }

    // Convert Kelvin to Celsius
    const kelvinToCelsius = (k) => (k - 273.15).toFixed(2);

    // Extract data
    const temp = kelvinToCelsius(data.main.temp);
    const humidity = data.main.humidity; // in %
    const windSpeed = data.wind.speed;   // in m/s

    

    document.getElementById("temp").innerHTML=`<h3 class="h3">Temperature:${temp} °C</h3>`;
    document.getElementById("humidity").innerHTML=`<h3 class="h3">Humidity:${humidity}%</h3>`;
    document.getElementById("wind").innerHTML=`<h3 class="h3">WindSpeed:${windSpeed}m/s</h3>`;

  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Failed to get Weather");
  }
}

