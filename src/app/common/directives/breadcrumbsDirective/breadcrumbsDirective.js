(function() {
    'use strict';

    angular
        .module('app.common')
        .directive('btfBreadcrumbs', btfBreadcrumbs);

    btfBreadcrumbs.$inject = ['$state', '$rootScope', '$interpolate'];

    function btfBreadcrumbs($state, $rootScope, $interpolate) {
        return {
            resctrict: 'E',
            scope: {},
            templateUrl: 'app/common/directives/breadcrumbsDirective/breadcrumbsDirectiveTemplate.html',
            link: function(scope) {
                scope.breadcrumbs = [];
                updateBreadcrumbs();
                $rootScope.$on('$stateChangeSuccess', function() { //eslint-disable-line   
                    updateBreadcrumbs();
                });

                function updateBreadcrumbs() {
                    var state = $state.$current,
                        breadcrumbs = [];

                    while (!state.self.abstract) {
                        breadcrumbs.push({
                            route: state.name,
                            name: $interpolate(state.data.displayName)(state.locals.globals)
                        });
                        state = state.parent;
                    }

                    breadcrumbs.reverse();
                    scope.breadcrumbs = breadcrumbs;
                }
            }
        };
    }
}());