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
        .factory('localStore', function($q){
            'use strict';

            var STORAGE_ID = 'github-search';

            var store = {
                results: JSON.parse(localStorage.getItem(STORAGE_ID) || []),

                _getFromLocalStorage: function () {
                    return this.results;
                },

                _searchIntoLocalStorage: function ( username ) {
                    var stored = {
                        store: [],
                        username: username
                    };

                    if( typeof localStorage.getItem(STORAGE_ID) === "undefined" ) {

                        return stored;

                    } else {

                        var current,
                            storage = JSON.parse(localStorage.getItem(STORAGE_ID));

                        for ( var i=0; i < storage.length; i++ ) {

                            current = storage[i].name;

                            if( username.toLowerCase() === current.toLowerCase()) {

                                return {
                                    store: storage[i],
                                    username: username
                                };
                            }
                        }

                        return stored;
                    }

                },

                _saveToLocalStorage: function ( results ) {
                    localStorage.setItem(STORAGE_ID, JSON.stringify( results ));
                },

                delete: function ( result ) {

                    store.results.splice(store.results.indexOf(result), 1);

                    return store._saveToLocalStorage(store.results).then(function(response) {
                        return response.data;
                    });
                },

                getAllUsers: function () {
                    return $q.when(angular.copy(store._getFromLocalStorage(), store.results));
                },

                getUserByUsername: function ( username ) {
                    return $q.when(angular.copy(store._searchIntoLocalStorage( username )));
                },

                insert: function ( result ) {
                    store.results.push( result );
                    return $q.when( store._saveToLocalStorage( store.results ) );
                }
            };

            return store;
        });
