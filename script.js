//this is the JS file that will house the backend for the APIs
const today = new Date();
const day = today.getDate();
const month = today.getMonth()+1;
const year = today.getFullYear();

const tagline = document.getElementById("tagline");

tagline.innerText = "${month}-${day}-${year}"; 

//the following is copied from freeCodeCamp. will need to tweak it for my purposes. 
// NOAA API is located at https://api.weather.gov 

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sendMessage').onclick = function () {
        const userName = document.getElementById('name').value;
        const url = 'https://api.weather.gov';
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                const serverResponse = JSON.parse(xhr.response);
                document.getElementsByClassName('message')[0].textContent = serverResponse.userName + serverResponse.suffix;
            };
        };
    const body = JSON.stringify({ userName: userName, suffix: ' loves cats!' });
    xhr.send(body);
    };
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    document.getElementById('article1').innerHTML =
      'latitude: ' + position.coords.latitude +
      '<br>longitude: ' + position.coords.longitude;
  });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getMessage').onclick = function () {
        const req = new XMLHttpRequest();
        req.open('GET', 'https://api.weather.gov', true);
        req.send();
        req.onload = function () {
            let json = JSON.parse(req.responseText);
            let html = '';
            json = json.filter(function (val) {
                return val.id !== 1;
            });
            json.forEach(function (val) {
                html += "<p class='weatherData'>" + val + "</p>";
            });
            document.getElementsByClassName('articles')[1].innerHTML = html;
        };
    };
});

/*
            json.forEach(function (val) {
                html += "<div class = 'cat'>";
                html +="<img src='" + val.imageLink + "' " + "alt='" + val.altText + "'>";
                html += '</div>';
            });
*/