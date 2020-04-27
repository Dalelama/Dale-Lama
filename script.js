$(document).ready(function () {
    var country;
    var countryCode;
    var city;
    var cityName;
    var temp;
    var windspeed;
    var windspeedkmH;
    var windspeedms;
    var windspeedknots;
    var description;
    var weatherID
    var humidity;
    var cTemp;
    var fTemp;
    var api;
    var tempToggle = true;
    $i = 0;
    //------------------------------------------------------------------------------------------------->
    function letter(str) {
        return str.toLowerCase().split(' ').map(function (word) {
            return word.replace(word[0], word[0].toUpperCase())
        }).join(' ');
    }
    //------------------------------------------------------------------------------------------------->
    function setCity(city, country) {
        city = letter(city);
        $('#city').val(city + ',' + country);
    };
    //------------------------------------------------------------------------------------------------->
    function getlocation() {
        $.getJSON('https://freegeoip.net/json/', function (location) {
            //------------------------------------------------------------------------------------------------->
            city = location.city;
            api = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a36e7a326a579bb5d2549c43adf7376d';
            weather(api);
        });
    };
    //------------------------------------------------------------------------------------------------->
    $('#city').keypress(function (e) {

        var key = e.which;
        if (key == 13) {
            $('#city').submit();
            city = $(this).val();
            console.log(city)
            var zipcode = $(this).val();
            var placeholder = $('#city').attr('placeholder');
            if (placeholder === "enter your city") {
                api = ' https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a36e7a326a579bb5d2549c43adf7376d';
            } else if (placeholder === "enter zip-code") {
                api = ' https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + '&appid=a36e7a326a579bb5d2549c43adf7376d'
            }
            console.log('api: ' + api)
            weather(api)
        };
    });

    function weather(api) {
        $.getJSON(api, function (weather) {
            //------------------------------------------------------------------------------------------------->
            cityName = weather.name;
            temp = weather.main.temp;
            windspeed = weather.wind.speed;
            description = weather.weather[0].description;
            weatherID = weather.weather[0].id;
            humidity = weather.main.humidity;
            country = weather.sys.country;
            fTemp = ((temp) * (9 / 5) - 459.67).toFixed(0);
            cTemp = (temp - 273.15).toFixed(0);
            //------------------------------------------------------------------------------------------------->
            windspeedkmH = Math.round(windspeed * 3, 6).toFixed(0);
            windspeedms = windspeed.toFixed(0);
            windspeedknots = Math.round(((1.9438 * windspeed) * 100) / 100).toFixed(0);
            setCity(cityName, country);
            //------------------------------------------------------------------------------------------------->
            $('#weather-description').html(description).fadeIn();
            $('#temp').html(cTemp);
            $('h1 .sign').html('&deg;C')
            $('#windspeed').html(windspeedkmH);
            $('.wind-speed .sign').html(' km/h');
            $('#humidity').html(humidity);
            //------------------------------------------------------------------------------------------------->
            changeWeatherIcon(weatherID);
        });
    };
    //------------------------------------------------------------------------------------------------->
    $('#location').on('click', getlocation);

    getlocation();

    $('#city').click(function () {
        $('#city').val("");
    });
    //------------------------------------------------------------------------------------------------->
    function changeWeatherIcon(weatherID) {
        var thunderstorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
        var snow = [600, 601, 602, 615, 611, 612, 616, 620, 621, 622];
        var sun = [800];
        var rain = [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
        var clouds = [801, 802, 803, 804];
        x = clouds.indexOf(weatherID);
        //------------------------------------------------------------------------------------------------->
        var removeVisible = $('.icon').removeClass('visible');

        function setColorsblue() {
            $('.container').css({
                'background-color': '#1ad3fd'
            });
            $('.sexy_line').css({
                'background': '-webkit-gradient(linear, 0 0, 100% 0, from(#1ad3fd), to(#1ad3fd),color-stop(50%, #06333E)'
            })
            $('body, html').css({
                'color': '#06333E',
                'background-color': '#e2e2e2'
            });
            $('h1,h3, #weather-description, #run').css({
                'color': '#06333E'
            });
            $('.sign').css({
                'color': '#FD3380'
            });
            $('img').attr('src', oldSrc);
        };

        function setColorsgreen() {
            $('.container').css({
                'background-color': '#00FFB6 '
            });
            $('.sexy_line').css({
                'background': '-webkit-gradient(linear, 0 0, 100% 0, from(#00FFB6), to(#00FFB6),color-stop(50%, #00402D)'
            })
            $('body, html').css({
                'color': '#FF4E40',
                'background-color': '#0DC0FF'
            });
            $('h1, #weather-description, #run, h3').css({
                'color': '#00402D'
            });
            $('.sign').css({
                'color': '#FF4E40'
            });
            $('img').attr('src', oldSrc);
        };

        function setColorsGrey() {
            $('.container').css({
                'background-color': '#363738'
            });
            $('.sexy_line').css({
                'background': '-webkit-gradient(linear, 0 0, 100% 0, from(#363738), to(#363738),color-stop(50%, #f9f9f7)'
            })
            $('body, html').css({
                'color': '#2E3845',
                'background-color': '#FFFFFF'
            });
            $('h1, h3, #weather-description, #run').css({
                'color': '#f9f9f7'
            });
            $('.sign').css({
                'color': '#1ad3fd'
            });
            $('img').attr('src', newSrc);
        }

        function setColorsWhite() {
            $('.container').css({
                'background-color': '#1D65F0'
            });
            $('.sexy_line').css({
                'background': '-webkit-gradient(linear, 0 0, 100% 0, from(#1D65F0), to(#1D65F0),color-stop(50%, #01FDF3)'
            })
            $('body, html').css({
                'color': '#1FDF3',
                'background-color': '#b1b4b8'
            });
            $('h1, #weather-description, #run, h3').css({
                'color': '#fff'
            });
            $('.sign').css({
                'color': '#1FDF3'
            });

            $('img').attr('src', newSrc);
        };
        //------------------------------------------------------------------------------------------------->
        if (thunderstorm.indexOf(weatherID) !== -1) {
            removeVisible;
            $('#storm').addClass('visible');
            setColorsGrey();
        };

        if (snow.indexOf(weatherID) !== -1) {
            removeVisible;
            $('#snow').addClass('visible');
            setColorsWhite();
            snowing();
        };

        if (sun.indexOf(weatherID) !== -1) {
            removeVisible;
            $('#sunny').addClass('visible');
            setColorsblue();
        };

        if (rain.indexOf(weatherID) !== -1) {
            //setColorsgreen();
            setColorsGrey();
            removeVisible;
            $('#rain').addClass('visible');
        };
        if (clouds.indexOf(weatherID) !== -1) {
            removeVisible;
            $('#clouds').addClass('visible').fadeIn();;
            setColorsblue();
        };
        if (weatherID >= 900) {
            removeVisible;
            setColorsGrey();
            $('#run').addClass('visible run').html("<h1>RUN!</h1><h2>f@#kin run ! for your life</h2>");
        }
        if ((weatherID >= 700) && (weatherID < 799)) {
            removeVisible;
            setColorsgreen();
            $('#justClouds').addClass('visible');
        }
    };
    //------------------------------------------------------------------------------------------------->
    function snowing() {
        //function timers
        var timer1 = 0;
        var timer2 = 0;
        var numer1 = 0;
        var numer2 = 1;
        //------------------------------------------------------------------------------------------------->
        function randomIntFromInterval(max, min) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        //------------------------------------------------------------------------------------------------->
        function numb() {
            numer1 = numer1 + 2;
            if (numer1 >= 160) numer1 = 0;
            timer1 = setTimeout(numb, 500);
            var n = (Math.floor(Math.random() * 3)) + 1;
            var position = randomIntFromInterval(0, 10);
            var position2 = randomIntFromInterval(75, 85);
            var timeFall = randomIntFromInterval(7, 10);
            //------------------------------------------------------------------------------------------------->
            $(".snow div:nth-child(" + numer1 + ")").css({
                "animation": "snow" + n + " " + timeFall + "s linear",
                "left": +position + "0%",
                "top": +position2 + "%"
            });
        };
        //------------------------------------------------------------------------------------------------->
        function numb2() {
            numer2 = numer2 + 2;
            if (numer2 >= 160) numer2 = 1;
            timer2 = setTimeout(numb2, 500);
            var nEven = (Math.floor(Math.random() * 3)) + 1;
            var positionEven = randomIntFromInterval(0, 10);
            var position2Even = randomIntFromInterval(75, 85);
            var timeFallEven = randomIntFromInterval(7, 10);
            $(".snow div:nth-child(" + numer2 + ")").css({
                "animation": "snow" + nEven + " " + timeFallEven + "s linear",
                "left": +positionEven + "0%",
                "top": +position2Even + "%"
            });
        };
        numb();
        numb2();
        //------------------------------------------------------------------------------------------------->
        function makeFlakes() {
            var i = 0;
            var snow = "";
            var flake = '<div class="spin"></div>';
            while (i <= 160) {
                snow += flake;
                i++;
            }
            $(".snow").html(snow);
        }

        makeFlakes();
    };
    //------------------------------------------------------------------------------------------------->
    // show menu
    $('#settings').on('click', function () {
        $('.settings').fadeToggle('visible');
    });

    //------------------------------------------------------------------------------------------------->
    getlocation();
});
