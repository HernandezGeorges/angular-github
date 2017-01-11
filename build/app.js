/**
 * Main Github Account Search module
 *
 * @type  {angular.Module}
 */

(function(){
    'use strict';

    angular.module('githubViewer', ['angular-loading-bar'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);
})();
