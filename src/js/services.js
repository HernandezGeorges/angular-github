/**
 * Services that:
 *  Expose a Github service that fetches datas using github api
 *  Persist and Retrieve datas from localStorage
 */
angular.module('githubViewer')
        .factory('github', function($http){
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
        })
        .factory('localStorage', function($q){
            'use strict';

            var STORAGE_ID = 'github-search';

            var store = {
                results: [],

                _getFromLocalStorage: function () {
                    return JSON.parse(localStorage.getItem(STORAGE_ID) || []);
                },

                _saveToLocalStorage: function (results) {
                    localStorage.setItem(STORAGE_ID, JSON.stringify(results));
                },

                delete: function (result) {

                    store.results.splice(store.results.indexOf(result), 1);

                    return store._saveToLocalStorage(store.results).then(function(response) {
                        return response.data;
                    });
                },

                get: function () {

                    return angular.copy(store._getFromLocalStorage(), store.results).then(function(response) {
                        return response.data;
                    });
                },

                insert: function (result) {

                    store.results.push(result);

                    return store._saveToLocalStorage(store.results).then(function(response){
                        return response.data;
                    });
                }
            };

            return store;
        });
