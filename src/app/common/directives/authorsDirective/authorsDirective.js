(function() {
    'use strict';

    angular
        .module('app.common')
        .directive('btfAuthors', btfAuthors);

    function btfAuthors() {
        return {
            restrict: 'E',
            scope: {
                availableAuthors: '=',
                courseAuthors: '='
            },
            templateUrl: 'app/common/directives/authorsDirective/authorsDirectiveTemplate.html',
            link: function(scope, elm, attrs, ctrl) {
                var addButton = angular.element('#btnAddAuthor'),
                    removeButton = angular.element('#btnRemoveAuthor');

                addButton.bind('click', function(e) {
                    if (angular.isDefined(scope.selectedAvailableAuthors)) {
                        scope.$apply(function() {

                            scope.courseAuthors = transfer(scope.selectedAvailableAuthors, scope.courseAuthors);

                            scope.availableAuthors = _.differenceBy(scope.availableAuthors, scope.courseAuthors, 'id');

                            scope.selectedAvailableAuthors = undefined;
                        });
                    }
                });

                removeButton.bind('click', function(e) {
                    if (angular.isDefined(scope.selectedCourseAuthors)) {
                        scope.$apply(function() {

                            scope.availableAuthors = transfer(scope.selectedCourseAuthors, scope.availableAuthors);

                            scope.courseAuthors = _.differenceBy(scope.courseAuthors, scope.availableAuthors, 'id');

                            scope.selectedCourseAuthors = undefined;
                        });
                    }
                });

                function transfer(selected, transferTo) {
                    _.each(selected, function(a) {
                        transferTo.push(angular.fromJson(a));
                    });

                    return transferTo;
                }
            }
        };
    }
}());