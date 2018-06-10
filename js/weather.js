function weather() {

    var location = document.getElementById("location");
    var url = 'https://api.forecast.io/forecast/df7e69b54ab5704912f0b629815f2095/';

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        day = new Date()
        var img = "leaf"
        location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';

        $.getJSON(url + latitude + "," + longitude + "?callback=?", function(data) {
            var icon = data.currently.icon;
            $('#temp').html((data.currently.temperature) + '°F');
            $('#wind').html('Wind Speed: ' + (data.currently.windSpeed) + ' m/h');
            $('#minutely').html(data.minutely.summary);
            $('#humidity').html('Humidity: ' + (data.currently.humidity * 100) + '%');
            $('#precip').html('Precipitation: ' + data.currently.precipIntensity + 'cm');
            $('#timezone').html(data.timezone);
            $('#day').html(day);
            img = newFunction(icon, img);
            $('#img').html("<img src=images/" + img + ".png></img>");
            location.innerHTML = data.daily.summary;


        });


    }

    function error() {
        location.innerHTML = "Sorry,Unable to retrieve your location";
    }

    function newFunction(icon, img) {
        if (icon == 'snow') {
            img = "snow-50";
        } else if (icon == 'rain') {
            img = "rain-50";
        } else if (icon === 'partly-cloudy-day') {
            img = "partly-cloudy-day-50";
        } else if (icon == 'partly-cloudy-night') {
            img = "night-filled-50";
        } else if (icon == 'clear-day') {
            img = "sun-50";
        } else if (icon == 'clear-night') {
            img = "new-moon-50";
        } else if (icon == 'sleet') {
            img = "sleet-50";
        } else if (icon == 'wind') {
            img = "windy-weather-50";
        } else if (icon == 'fog') {
            img = "dust-50";
        } else if (icon == 'cloudy') {
            img = "cloud-50";
        } else {
            img = "leaf";
        }
        return img;
    }
    location.innerHTML = "Searching.....";
}