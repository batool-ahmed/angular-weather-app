var app = angular.module("weatherApp", []);
app.controller("mainController", function ($scope, $http) {
    $scope.location = 'Karachi';

    $scope.getWeather = function () {
        const API_KEY = '4aa6e82d736f430436f7e2e558f8a23b';
        var apiCall = "https://api.openweathermap.org/data/2.5/forecast?q=" + $scope.location + "&appid=" + API_KEY + "&units=metric";

        $http.get(apiCall).then(function (response) {
            $scope.weather = response.data;
            console.log($scope.weather);
        }).catch(function (error) {
            $scope.error = 'Enter correct city name';
            console.error(error);
        });
    };
});