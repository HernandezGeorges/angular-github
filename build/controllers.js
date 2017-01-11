/**
 * Main controller of the app
 *
 * - retrieves the model via the github service
 * - exposes the model to the templates
 */
(function(){
    'use strict';

    angular.module('githubViewer')
    .controller('MainController', function MainController($scope, github, $log, $anchorScroll, $location, $timeout){

        var onUserComplete = function ( data ) {
            $scope.user = data;
            var blog = $scope.user.blog;
            if( null !== blog) {
                $scope.newBlog = blog.replace(/.*?:\/\//g, "");
            }
            // console.log($scope.user);
            $scope.figureSrc = $scope.user.avatar_url;
            $scope.error = "";
            $scope.showError = false;
            github.getRepos( $scope.user ).then( onRepos, onError );
        };

        var onRepos = function ( data ) {
            $scope.repos = data;
            // console.log(data);
            // $location.hash("user_details"); // UI Services
            // $anchorScroll(); // UI Services
        };

        var onError = function (reason) {
            $scope.error = "Données non trouvées !";
            $scope.showError = true;
        };

        $scope.search = function ( username ) {
            github.getUser( username ).then( onUserComplete, onError );
        };

        $scope.username = "angular";
        $scope.bigTitle = "Github Account Search";
        $scope.repoSortOrder = "-stargazers_count";

    });
})();
