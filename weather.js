var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');


var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var sys = document.querySelector('.sys');
var ctry = document.querySelector('.ctry');


button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + ' &APPID=3673d575465931964f7d057a84ca84b9&units=imperial')
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {

            var nameValue = data['name'];
            var tempValue = data['main']['temp'];
            var descValue = data['weather'][0]['description'];
            var sysValue = data['sys']['sunrise'];
            var ctryValue = data['sys']['country'];

            name.innerHTML = nameValue;
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;
            sys.innerHTML = sysValue;
            ctry.innerHTML = ctryValue;

        })

        .catch(err => alert("Wrong city name!"))
});
