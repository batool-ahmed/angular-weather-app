var app = angular.module("weatherApp", []);

app.controller("mainController", function ($scope, $http) {
    $scope.location = 'Karachi';

    $scope.getWeather = function () {

        const API_KEY = '4aa6e82d736f430436f7e2e558f8a23b';
        var apiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + $scope.location + "&appid=" + API_KEY + "&units=metric";
        var currentWeatherApiCall = "https://api.openweathermap.org/data/2.5/weather?q=" + $scope.location + "&appid=" + API_KEY + "&units=metric";

        $http.get(currentWeatherApiCall).then(function (response) {
            const currentWeather = response.data;
            console.log(currentWeather);
            
            $scope.currentWeather = {
                temperature: currentWeather.main.temp,
                description: currentWeather.weather[0].description,
                icon: currentWeather.weather[0].icon,
                wind: currentWeather.wind.speed,
                max: currentWeather.main.temp_max,
                min: currentWeather.main.temp_min,
                humidity: currentWeather.main.humidity
            };
        }).catch(function (error) {
            console.error(error);
        });


        $http.get(apiCall).then(function (response) {
            const weather = response.data.list;
            console.log(weather)
            // 4 weather updates after every 6 hours
            $scope.weatherNextFour = [];
            $scope.temperatures = []; 

            for (var i = 2; i < 11; i += 2) {
                $scope.weatherNextFour.push(
                    {
                        date: weather[i].dt_txt.slice(0,11),
                        time: weather[i].dt_txt.slice(11,16),
                        icon: weather[i].weather[0].icon,
                        description: weather[i].weather[0].description,
                        temperature: weather[i].main.temp,
                    });
                $scope.temperatures.push(weather[i].main.temp)
            }
            console.log($scope.weatherNextFour);
            console.log($scope.temperatures);
            $scope.error = ''
        }).catch(function (error) {
            // TODO: update error handling
            $scope.error = 'Enter correct city name';
            $scope.currentWeather = []
            $scope.weatherNextFour = []
            console.error(error);
        });
    };
});
