var app = angular.module("weatherApp", []);

app.controller("mainController", function ($scope, $http) {
    $scope.location = 'Karachi';
    $scope.weatherFiveDays = []; 

    $scope.getWeather = function () {
        const API_KEY = '4aa6e82d736f430436f7e2e558f8a23b';
        var apiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + $scope.location + "&appid=" + API_KEY + "&units=metric";

        $http.get(apiCall).then(function (response) {
            const weather = response.data.list;

            // 5 days weather after every 6 hours
            $scope.weatherFiveDays = [];
            for (var i = 0; i < weather.length; i += 2) {
                $scope.weatherFiveDays.push(weather[i]);
            }
            console.log($scope.weatherFiveDays);

        }).catch(function (error) {
            $scope.error = 'Enter correct city name';
            console.error(error);
        });
    };
});
