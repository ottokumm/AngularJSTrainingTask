(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('authService', authService);

    function authService($http, $localStorage, $state) {

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
                        'user': username,
                        'token': response.token
                    };
                    $http.defaults.headers.common.Authorization = response.token;
                });
        }

        function logout() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            $state.go('shell.login');
        }

        function getUserName() {
            return $localStorage.currentUser ? $localStorage.currentUser.user : '';
        }

        function isAuth() {
            return $localStorage.currentUser;
        }
    }
}());