(function () {


  var app = angular.module("githubViewer",  ['angular-loading-bar'])
                    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
                      cfpLoadingBarProvider.includeSpinner = false;
                    }]);

  var MainController = function ($scope, github, $log, $anchorScroll, $location){

    var onUserComplete = function (data) {
      $scope.user = data;
      $scope.error = "";
      $scope.showError = false;
      github.getRepos($scope.user).then(onRepos, onError);
    };

    var onRepos = function (data) {
      $scope.repos = data;
      // $location.hash("user_details"); // UI Services
      // $anchorScroll(); // UI Services
    };

    var onError = function (reason) {
      $scope.error = "Données non trouvées !";
      $scope.showError = true;
    };

    $scope.search = function (username) {
      github.getUser(username).then(onUserComplete, onError);
    };

    $scope.username = "angular";
    $scope.bigTitle = "Github Viewer";
    $scope.repoSortOrder = "-stargazers_count";

  };

  app.controller("MainController", MainController);

}());

/**
UI Related Services:
$window
$browser
$location
$animate
$anchorSroll
**/
