(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('authService', authService);

    function authService($rootScope, $http, $localStorage, $state) {

        return {
            login: login,
            logout: logout,
            getUserName: getUserName,
            isAuth: isAuth
        };

        function login(username, password) {
            return $http.post('/login', {
                    username: username,
                    password: password
                })
                .success(function(response) {
                    $localStorage.currentUser = {
                        'user': username
                    };

                    $rootScope.$emit('isAuthenticated');
                });
        }

        function logout() {
            delete $localStorage.currentUser;

            $rootScope.$emit('isNotAuthenticated');

            $state.go('shell.login');
        }

        function getUserName() {
            return $localStorage.currentUser ? $localStorage.currentUser.user : null;
        }

        function isAuth() {
            if ($localStorage.currentUser) {
                $rootScope.$emit('isAuthenticated');
            } else {
                $rootScope.$emit('isNotAuthenticated');
            }

            return $localStorage.currentUser;
        }
    }
}());