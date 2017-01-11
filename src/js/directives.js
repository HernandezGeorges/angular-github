/**
 * Directives that:
 * - detect when an account profile image is loaded and show filled template after
 */

(function() {
    'use strict';

    angular.module('githubViewer')
    .directive('imageOnLoad', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    onImageLoaded(element[0]);
                });
            }
        };
    })
    .directive('onSearchLoad', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('keydown', function(e) {
                    if (e.which == 13) {

                        // show spinner on search load
                        handleLoader();

                        // trouver si dans la liste de recherche
                        //          le block avec le terme recherché n'existe pas déjà
                        //
                        // S'il existe déjà,
                        //          Si c'est le bloc ouvert, le laisser ouvert
                        //          et ne lancer aucune recherche
                        //
                        //          Si c'est une recherche différente,
                        //          refermer le bloc de la dernière recherche si ouvert
                        //          et le ranger en haut de la pile
                        //
                        //          Déplacer le bloc du terme recherché en haut de la pile
                        //          et l'ouvrir
                        //
                        // S'il n'existe pas encore,
                        //          refermer le bloc de la dernière recherche si ouvert
                        //          et le ranger en haut de la pile
                        //
                        //          faire apparaitre un loader jusqu'à la fin du chargement
                        //          faire apparaitre le bloc avec l'image et cacher le loader
                        //
                        //
                        //
                        // ici, appeler la méthode toggleUserInfoBlock()
                        // * astuce,
                        //      trouver tout element close-block
                        //      qui ne se trouve pas dans un .user-infos.closed
                        // pour ranger la recherche effectuée en haut de la pile de recherche


                        // au lieu de supprimer les classes show et close, il faut ajouter le bloc à la pile
                        var card = document.querySelector('.user-infos');
                        card.classList.remove('show');
                        // card.classList.remove('closed');
                    }
                });
            }
        };
    })
    .directive('toggleBlock', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(e) {
                    toggleInfoBlock(this);
                });
            }
        };
    });
})();
