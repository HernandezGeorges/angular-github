/**
 *  Github service that fetches datas using github api
 */

var github = function($http){
    'use strict';

    var getUser = function (username) {
        return $http.get("https://api.github.com/users/" + username)
        .then(function (response){
            return response.data;
        });
    };

    var getRepos = function (user) {
        return $http.get(user.repos_url)
        .then(function (response) {
            return response.data;
        });
    };

    return {
        getUser: getUser,
        getRepos: getRepos
    };
};

angular.module('githubViewer').factory('github', github);
