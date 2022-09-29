const dateAll = document.getElementById("dateAll");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const minmax = document.getElementById("minmax");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const form = document.getElementById("form");
const input = document.getElementById("input");

//первая литера - заглавная
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1, str.length);
}

//градация ветра по градусам
function veter(vet) {
  if(vet == 0 || vet == 360) {
    return "Cеверный";
  }
  else if(vet > 0 && vet < 90){
    return "Северо-Восточный";
  }
  else if(vet == 90){
    return "Восточный";
  }
  else if(vet > 90 && vet < 180){
    return "Юго-Восточный";
  }
  else if(vet == 180){
    return "Южный";
  }
  else if(vet > 180 && vet < 270){
    return "Юго-Западный";
  }
  else if(vet == 270){
    return "Западный";
  }
  else if(vet > 270 && vet < 360){
    return "Северо-Западный";
  }
}

// вывод даты
let date = new Date();
var months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
var month = months[date.getMonth()];

//сегодняшняя дата в формате 12/12/2022
//let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

// в формате 12 января 2022
let output = String(date.getDate()).padStart(2, '0') + ' ' + month + ' ' + date.getFullYear();
//console.log(output);
dateAll.innerText = `${output}`;


//сегодняшняя дата в с часами
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
//  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = "0" + a.getHours();
  var min = "0" + a.getMinutes();
  var sec = "0"  + a.getSeconds();
  //var time = date + ' ' + month + ' ' + year + ' ' + hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
  var time =  hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
  //var dateAll = date + ' ' + month + ' ' + year;
  return time;
  //return {time : time, dateAll : dateAll}; - вывод и даты и времени 
  //вызов sss = timeConverter(data); sss.time и sss.dateAll

}
//console.log(timeConverter(0));

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Kushuhum&appid=cc7c8fdfcbbccc9dc62e21bde4bb83ee&units=metric&lang=ru"
)
  .then((response) => response.json())
  .then((data) => {

    city.innerText = `${data.name}, ${data.sys.country}`;
//    temp.innerText = `${Math.round(data.main.temp)} ° C`;
    temp.innerText = `${data.main.temp} ° C`;

    description.innerText = `${capitalize(data.weather[0].description)}`;
//    description.innerText = `${data.weather[0].description}`;
    minmax.innerText = `${Math.round(data.main.temp_min)} °C / ${Math.round(data.main.temp_max)} °C`;
    wind.innerHTML = `Скорость ветра : ${data.wind.speed} м/с <br> Направление ветра: ${veter(data.wind.deg)}`;
    pressure.innerText = `Атмосферное давление : ${data.main.pressure} гПа / ${Math.round(data.main.pressure*0.750063755419211)} мм рт ст`;
    humidity.innerText = `Влажность : ${data.main.humidity} %`;
    voshod.innerText = `Восход: ${timeConverter(data.sys.sunrise)} / Закат: ${timeConverter(data.sys.sunset)}`;
    console.log(data);
  });

let url = "https://api.openweathermap.org/data/2.5/";
//let url = "https://api.openweathermap.org/data/3.0/";

let key = "ed4eefb40d34b24476c61a5f21abc734";// при регистрации выдает

function getResult(city) {
  let link = `${url}weather?q=${city}&appid=${key}&units=metric&lang=ru`;// струтура запроса
  fetch(link)
    .then((response) => response.json())
    .then(out); // выполняем функцию out
}

let out = (data) => {
      city.innerText = `${data.name}, ${data.sys.country}`;
  //    temp.innerText = `${Math.round(data.main.temp)} ° C`;
      temp.innerText = `${data.main.temp} ° C`;
  
      description.innerText = `${capitalize(data.weather[0].description)}`;
  //    description.innerText = `${data.weather[0].description}`;
      minmax.innerText = `${Math.round(data.main.temp_min)} °C / ${Math.round(data.main.temp_max)} °C`;
      wind.innerHTML = `Скорость ветра : ${data.wind.speed} м/с <br> Направление ветра: ${veter(data.wind.deg)}`;
      pressure.innerText = `Атмосферное давление : ${data.main.pressure} гПа / ${Math.round(data.main.pressure*0.750063755419211)} мм рт ст`;
      humidity.innerText = `Влажность : ${data.main.humidity} %`;
      voshod.innerText = `Восход: ${timeConverter(data.sys.sunrise)} / Закат: ${timeConverter(data.sys.sunset)}`;
      input.value = "";

};


// срабатывает на кнопку submit или enter в любом поле формы
form.addEventListener("submit", function (event) {
  event.preventDefault();
  getResult(input.value);
});
