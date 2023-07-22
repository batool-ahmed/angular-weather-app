var app = angular.module("weatherApp", []);

app.controller("mainController", function ($scope, $http) {
    $scope.location = 'Karachi';

    $scope.getWeather = function () {
        // TODO: Add current weather separately

        const API_KEY = '4aa6e82d736f430436f7e2e558f8a23b';
        var apiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + $scope.location + "&appid=" + API_KEY + "&units=metric";

        $http.get(apiCall).then(function (response) {
            const weather = response.data.list;

            // 5 days weather after every 6 hours
            $scope.weatherNextFive = [];
            $scope.temperatures = []; 

            for (var i = 2; i < 10; i += 2) {
                $scope.weatherNextFive.push(weather[i]);
                $scope.temperatures.push(weather[i].main.temp)
            }
            console.log($scope.weatherNextFive);
            console.log($scope.temperatures);
        }).catch(function (error) {
            $scope.error = 'Enter correct city name';
            console.error(error);
        });
    };
});
