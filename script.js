var button = document.querySelector('.button');
var inputText = document.querySelector('.inputText');
var namer = document.querySelector('.namer');
var temp = document.querySelector('.temp');
var lat= document.querySelector('.lat');
var lon= document.querySelector('.lon');
var conName = document.getElementById('.zoneName');
var timeone = document.getElementById('.timeone');

var tat=[['day','Temp°c'],
['Mon',  0],
['Tue',  10],
['Wed',  20],
['Thur', 30],
['Fri',  40],
['Sat' , 50],
['Sun' , 60]];


const API_KEY = '5141eb393a0ac9907c7c5965d68188d9';
button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputText.value+'&appid=5141eb393a0ac9907c7c5965d68188d9')
        .then(response=>response.json())
        .then(data=>{
                console.log(data);

                var long = data['coord']['lon'];
                var lati = data['coord']['lat'];
                var namerval = data['name'];
                var tempval =  String(parseFloat(data['main']['temp']-273.15).toFixed(2))+"°"+"c";
                
                namer.innerHTML =namerval;
                temp.innerHTML = tempval;
                // lat.innerHTML = lati;
                // lon.innerHTML = long;
        

              
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lati+'&lon='+long+'&exclude=hourly,minutely&units=metric&appid=5141eb393a0ac9907c7c5965d68188d9').then(res=>res.json()).then(data => {
                    console.log(data)
                    showWeatherData(data);
                    showGraph(data);
                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart);

                    console.log(tat);
                })
     
            })

.catch(err=>alert("Please Check Location !!! "))
})




const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");




function showWeatherData(data)
{
    let {humidity , pressure, wind_speed} = data.current;

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-items">
        <div  >
            <p>Humidity  - ${humidity}%</p>
        </div>
        <div ></div>
    </div>
    <div class="weather-items">
        <div >Pressure  -${pressure} Pa</div>
        <div ></div>
    </div>
    <div class="weather-items">
        <div >wind  -${wind_speed} m/s</div>
        <div ></div>
    </div>`;
    
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
            
        }
    })

    weatherForecastEl.innerHTML = otherDayForcast;

    

}
       
        // ['Day', 'Temp*c'],
        // ['Mon',  31.2],
        // ['Tue',  -10.2],
        // ['Wed',  30.3],
        // ['Thur', -2.33],
        // ['Fri',   23],
        // ['Sat' ,  28.3],
        // ['Sun' , 12]
                
function showGraph(data)
{
    
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            
        }else{
                console.log(window.moment(day.dt*1000).format('ddd'));
                console.log(day.temp.day);
                tat[idx][0]=window.moment(day.dt*1000).format('ddd');
                tat[idx][1]=day.temp.day;
                
        }
    })
    console.log(tat);
}
// console.log(tat);

function drawChart() {
    var data = google.visualization.arrayToDataTable(tat);

    var options = {
    title: 'Weather Forecast',  
    curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: {fill : "#696969"},
    chartArea: {
        backgroundColor: {
          fill: 'White',
          color: 'White'
          },
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}
var date = new Date();
var day = date.getDay();
var month = date.getMonth();
switch(month){
    case 0: month = "January"; break;
    case 1: month = "February"; break;
    case 2: month = "March"; break;
    case 3: month = "April"; break;
    case 4: month = "May"; break;
    case 5: month = "June"; break;
    case 6: month = "July"; break;
    case 7: month = "August"; break;
    case 8: month = "September"; break;
    case 9: month = "October"; break;
    case 10: month = "November"; break;
    case 11: month = "December"; break;
}
switch(day){
    case 0: day = "Sunday"; break;
    case 1: day = "Monday"; break;
    case 2: day = "Tuesday"; break;
    case 3: day = "Wednesday"; break;
    case 4: day = "Thursday"; break;
    case 5: day = "Friday"; break;
    case 6: day = "Saturday"; break;
}
document.getElementById('date').innerHTML = 
date.getHours()+`:`+date.getMinutes()+` - ` +  day + `, ` + date.getDate() + ` ` + month + ` ` + date.getFullYear();
