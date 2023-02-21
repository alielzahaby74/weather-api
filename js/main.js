const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dt = new Date();
async function getData(country = "Egypt"){
    let call = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=de130bc915c94dfb87e193235231402&q=${country}&days=3&aqi=yes&alerts=yes`);
    let data = await call.json();
    
    let degrees = Array.from(document.querySelectorAll('.deg'));
    let imgs = Array.from(document.querySelectorAll('.weather-img'));
    let statuses = Array.from(document.querySelectorAll('.weather-status'));
    let days = Array.from(document.querySelectorAll('.day'));
    let dayOfdate = data.forecast.forecastday[0].date.slice(8,10);
    let city = document.getElementById('city');

    let rain = document.getElementById('rain');
    let wind = document.getElementById('wind');
    let windDirection = document.getElementById('wind-dir');


    rain.innerText = data.forecast.forecastday[0].day.daily_chance_of_rain + "%";
    wind.innerText = data.forecast.forecastday[0].day.maxwind_kph + "Km/h";
    windDirection.innerText = data.current.wind_dir;
    city.innerText = data.location.name;
    console.log(imgs);
    for(let i = 0; i < degrees.length; i++){
        imgs[i].src = "https://" + data.forecast.forecastday[i].day.condition.icon;
        degrees[i].innerText = data.forecast.forecastday[i].day.avgtemp_c;
        statuses[i].innerText = data.forecast.forecastday[i].day.condition.text;
        days[i].innerText = daysOfTheWeek[(dt.getDay() + i)%7];
        console.log(daysOfTheWeek[dt.getDay(data.forecast.forecastday[i].date)]);
        
        // days[i].innerText = data.forecast.forecastday[i].date;
    }
    let date = document.getElementById('date');
    console.log(date);
    date.innerText = dayOfdate + Months[dt.getMonth(data.forecast.forecastday[0].date)];
    console.log(degrees);
    console.log(data);
}
getData();

let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
try{
    searchBtn.addEventListener('click', function(){
        getData(searchInput.value);
    })
}catch(e){
    console.log(e);
}
