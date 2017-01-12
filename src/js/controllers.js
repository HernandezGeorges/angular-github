/**
 * Main controller of the app
 *
 * - retrieves the model via the github service
 * - exposes the model to the templates
 */
(function(){
    'use strict';

    angular.module('githubViewer')
    .controller('MainController', function MainController($scope, github, localStore, $log){

        // console.log(localStorage);

        var onUserComplete = function ( data ) {
            $scope.user             = {};
            $scope.user.name        = data.name;
            $scope.user.login       = data.login;
            $scope.user.email       = data.email;
            $scope.user.figureSrc   = data.avatar_url;
            $scope.user.blog        = data.blog;
            $scope.user.bio         = data.bio;
            $scope.user.type        = data.type;
            $scope.user.location    = data.location;

            var blog = data.blog;
            if( null !== blog) {
                $scope.user.newBlog = blog.replace(/.*?:\/\//g, "");
            }

            $scope.error        = "";
            $scope.showError    = false;

            // console.log('DATA USER ::', data);

            github.getRepos( data ).then( onRepos, onError );
        };

        var onRepos = function ( data ) {
            // console.log('DATA REPOS ::', data);
            $scope.repos            = [];
            for(var i=0; i < data.length; i++ ) {
                // console.log(data[i]);
                $scope.repos[i]                     = {};
                $scope.repos[i].name                = data[i].name;
                $scope.repos[i].stargazers_count    = data[i].stargazers_count;
                $scope.repos[i].language            = data[i].language;
                $scope.repos[i].description         = data[i].description;
                $scope.repos[i].updated_at          = data[i].updated_at;
            }


            // create the new result object
            var result = {
                name: $scope.user.login,
                user: $scope.user,
                repos: $scope.repos
            };

            // console.log(result);
            // console.log(result);
            // console.log(localStorage);
            // console.log('REPOS RETRIEVED ::',result);
            // persist the result in local storage
            localStore.insert( result );
                            // .then(function success() {
                                // $scope.message = localStorage.getAll();
                                // console.log(localStorage.getAll());
                            // });
        };

        var onError = function ( reason ) {
            $scope.error        = "Données non trouvées !";
            $scope.showError    = true;
        };

        var onLocalUser = function ( local ) {
            // user is not found locally,
            // perform a search online
            if ( local.store.length === 0 ) {
                github.getUser( local.username ).then( onUserComplete, onError );
                return;
            }

            // else set scope user datas
            $scope.user     = local.store.user;
            $scope.repos    = local.store.repos;
        };

        $scope.search = function  ( username ) {
            localStore.getUserByUsername( username ).then( onLocalUser );
        };

        $scope.username         = "angular";
        $scope.bigTitle         = "Github Account Search";
        $scope.repoSortOrder    = "-stargazers_count";

    });
})();
