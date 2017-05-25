(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', 'Preferences', 'Points', '$state'];

    function HomeController ($scope, Principal, LoginService, Preferences, Points, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
                
                if (vm.isAuthenticated()) {
                    Preferences.user(function (preferences) {
                        vm.preferences = preferences;
                        Points.thisWeek(function (points) {
                            vm.pointsThisWeek = points;
                            vm.pointsPercentage = (points.points / vm.preferences.weeklyGoal) * 100;
                        });
                    });
                }
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
